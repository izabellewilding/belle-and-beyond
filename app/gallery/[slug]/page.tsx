import { notFound } from "next/navigation";
import { Navigation } from "../../components/navigation";
import { Footer } from "../../components/footer";
import Image from "next/image";
import { getGalleryBySlug, getAllGalleries } from "@/sanity/lib/api";

// Enable dynamic rendering - pages will be generated on-demand
export const dynamicParams = true; // Allow dynamic params not returned by generateStaticParams
export const revalidate = 0; // Always fetch fresh data

// Image metadata interface
interface ImageMetadata {
  src: string;
  alt: string;
  title?: string;
  photographer?: string;
}

// Gallery interface
interface Gallery {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  images: ImageMetadata[];
}

interface GalleryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: GalleryPageProps) {
  const { slug } = await params;
  const gallery = (await getGalleryBySlug(slug)) as Gallery | null;

  if (!gallery) {
    return {
      title: "Gallery | Izzia Travel",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://izziatravel.com";
  const pageUrl = `${baseUrl}/gallery/${slug}`;
  const firstImage = gallery.images?.[0]?.src;
  const ogImage = firstImage ? `${baseUrl}${firstImage}` : undefined;

  return {
    title: `${gallery.title} Gallery | Izzia Travel`,
    description: gallery.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${gallery.title} Gallery | Izzia Travel`,
      description: gallery.description,
      type: "website",
      url: pageUrl,
      siteName: "Izzia Travel",
      images: ogImage
        ? [
            {
              url: ogImage,
              alt: gallery.images[0]?.alt || gallery.title,
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${gallery.title} Gallery | Izzia Travel`,
      description: gallery.description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { slug } = await params;
  const gallery = (await getGalleryBySlug(slug)) as Gallery | null;

  if (!gallery) {
    notFound();
  }

  // Generate structured data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${gallery.title} Gallery`,
    description: gallery.description,
    image: (gallery.images || []).map((img) => ({
      "@type": "ImageObject",
      contentUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "https://izziatravel.com"}${img.src}`,
      description: img.alt,
      name: img.title || img.alt,
      creator: img.photographer
        ? {
            "@type": "Person",
            name: img.photographer,
          }
        : undefined,
    })),
  };

  return (
    <div className="min-h-screen ">
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="pt-16 md:pt-16">
        {/* Header */}
        <section className="bg-white py-4 md:py-0 md:pt-8 md:pb-8 px-4 md:px-10 lg:px-14 w-full">
          <div className="mb-2 md:mb-8">
            <div className="border-t border-neutral-400/70" />
            <h1 className="mt-4 md:mt-8 text-3xl md:text-5xl font-serif text-neutral-900">
              {gallery.title}
            </h1>
            {gallery.description && (
              <p className="mt-3 md:mt-6 text-sm md:text-lg text-neutral-700 max-w-3xl">
                {gallery.description}
              </p>
            )}
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-4 md:pt-8 lg:pt-0 px-4 md:px-10 lg:px-14 w-full">
          {gallery.images && gallery.images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {Array.from({ length: 3 }, (_, columnIndex) => (
                <div key={columnIndex} className="grid gap-2">
                  {gallery.images
                    .map((image, index) => ({ image, index }))
                    .filter(({ index }) => index % 3 === columnIndex)
                    .map(({ image, index: globalIndex }) => (
                      <div key={globalIndex} className="relative group">
                        <div className="relative w-full rounded-lg overflow-hidden bg-neutral-100">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            title={image.title || image.alt}
                            width={800}
                            height={1200}
                            className="w-full h-auto object-contain"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            loading={globalIndex < 3 ? "eager" : "lazy"}
                          />
                        </div>
                        {image.photographer && (
                          <div className="mt-2 bg-neutral-800 text-white text-xs px-3 py-2 rounded">
                            <span className="font-medium">
                              Photo by {image.photographer}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-600">
                No images available for this gallery yet.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const galleries = await getAllGalleries();
  return galleries.map((gallery: { slug: string }) => ({
    slug: gallery.slug,
  }));
}

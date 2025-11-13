import { notFound } from "next/navigation";
import { Navigation } from "../../components/navigation";
import { Footer } from "../../components/footer";
import Image from "next/image";
import { getGalleryBySlug, getAllGalleries } from "@/sanity/lib/api";

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

  if (!gallery || !gallery.images || gallery.images.length === 0) {
    notFound();
  }

  // Generate structured data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${gallery.title} Gallery`,
    description: gallery.description,
    image: gallery.images.map((img) => ({
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

      <main className="pt-24 md:pt-16">
        {/* Header */}
        <section className="bg-white py-24 md:py-0 md:pt-8 md:pb-8 px-4 md:px-10 lg:px-14 w-full">
          <div className="mb-2 md:mb-8">
            <div className="border-t border-neutral-400/70" />
            <h1 className="mt-8 text-4xl md:text-5xl font-serif text-neutral-900">
              {gallery.title}
            </h1>
            {gallery.description && (
              <p className="mt-6 text-md md:text-lg text-neutral-700 max-w-3xl">
                {gallery.description}
              </p>
            )}
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-24 md:pt-8 lg:pt-0 px-4 md:px-10 lg:px-14 w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }, (_, columnIndex) => (
              <div key={columnIndex} className="grid gap-4">
                {gallery.images
                  .map((image, index) => ({ image, index }))
                  .filter(({ index }) => index % 4 === columnIndex)
                  .map(({ image, index: globalIndex }) => (
                    <div key={globalIndex} className="relative group">
                      <Image
                        className="h-auto max-w-full rounded-lg"
                        src={image.src}
                        alt={image.alt}
                        title={image.title || image.alt}
                        width={400}
                        height={600}
                        sizes="(max-width: 768px) 50vw, 25vw"
                        loading={globalIndex < 4 ? "eager" : "lazy"}
                      />
                      {image.photographer && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-3 py-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Generate static params for all gallery slugs
export async function generateStaticParams() {
  const galleries = await getAllGalleries();
  return galleries.map((gallery: { slug: string }) => ({
    slug: gallery.slug,
  }));
}

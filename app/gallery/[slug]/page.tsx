import { notFound } from "next/navigation";
import { Navigation } from "../../components/navigation";
import { Footer } from "../../components/footer";
import { BentoGallery } from "../../components/BentoGallery";
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
      title: "Gallery | The Portable Life",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://izziatravel.com";
  const pageUrl = `${baseUrl}/gallery/${slug}`;
  const firstImage = gallery.images?.[0]?.src;
  const ogImage = firstImage ? `${baseUrl}${firstImage}` : undefined;

  return {
    title: `${gallery.title} Gallery | The Portable Life`,
    description: gallery.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${gallery.title} Gallery | The Portable Life`,
      description: gallery.description,
      type: "website",
      url: pageUrl,
      siteName: "The Portable Life",
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
      title: `${gallery.title} Gallery | The Portable Life`,
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

        {/* Gallery Grid - Bento Style */}
        <section className="py-4 md:pt-8 lg:pt-0 px-4 md:px-10 lg:px-14 w-full">
          {gallery.images && gallery.images.length > 0 ? (
            <BentoGallery images={gallery.images} />
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

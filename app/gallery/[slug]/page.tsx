import { notFound } from "next/navigation";
import { Navigation } from "../../components/navigation";
import { Footer } from "../../components/footer";
import Image from "next/image";

// Image metadata interface
interface ImageMetadata {
  src: string;
  alt: string;
  title?: string;
  photographer?: string;
}

// Define the gallery data with image metadata
const galleryData = {
  landscapes: {
    title: "Landscapes",
    description:
      "Quiet, far-flung corners where stillness meets landscape and story.",
    images: [
      {
        src: "/images/algarve-clifs.JPG",
        alt: "Dramatic cliffs along the Algarve coastline with ocean views",
        title: "Algarve Cliffs",
        photographer: "Izabelle Wilding",
      },
      {
        src: "/images/algarve_sunset_zia_portrait.JPG",
        alt: "Sunset over the Algarve with portrait silhouette against colorful sky",
        title: "Algarve Sunset",
        photographer: "Izabelle Wilding",
      },
      // Add more landscape images here
    ] as ImageMetadata[],
  },
  flora: {
    title: "Flora",
    description:
      "Echoes of the past captured in textures, artifacts, and timeless spaces.",
    images: [
      {
        src: "/images/brazil-flower.JPG",
        alt: "Vibrant Iris from Brazil with rich colors",
        title: "Brazilian Flower",
        photographer: "Izabelle Wilding",
      },
      {
        src: "/images/ferns.JPG",
        alt: "Lush green ferns in natural forest setting",
        title: "Forest Ferns",
        photographer: "Izabelle Wilding",
      },
      {
        src: "/images/hibiscus.JPG",
        alt: "Beautiful hibiscus flower in full bloom",
        title: "Hibiscus Bloom",
        photographer: "Izabelle Wilding",
      },
      {
        src: "/images/brazil-flower.JPG",
        alt: "Vibrant tropical flower from Brazil with rich colors",
        title: "Brazilian Flower",
        photographer: "Izabelle Wilding",
      },
      {
        src: "/images/ferns.JPG",
        alt: "Lush green ferns in natural forest setting",
        title: "Forest Ferns",
        photographer: "Izabelle Wilding",
      },
      {
        src: "/images/hibiscus.JPG",
        alt: "Beautiful hibiscus flower in full bloom",
        title: "Hibiscus Bloom",
        photographer: "Izabelle Wilding",
      },
      // Add more flora images here
    ] as ImageMetadata[],
  },
  people: {
    title: "People",
    description:
      "Clifftops, coves, and windswept meadows along a rugged coastline.",
    images: [
      {
        src: "/images/zia-sunset.JPG",
        alt: "Portrait of Zia during sunset with warm golden light",
        title: "Sunset Portrait",
        photographer: "Izabelle Wilding",
      },
      {
        src: "/images/izzy_zia.JPG",
        alt: "Portrait of Izzy and Zia together",
        title: "Izzy and Zia",
        photographer: "Izabelle Wilding",
      },
      // Add more people images here
    ] as ImageMetadata[],
  },
  foliage: {
    title: "Foliage",
    description:
      "Sunlit streets, tiled façades, and small discoveries in the city's rhythm.",
    images: [
      {
        src: "/images/ferns.JPG",
        alt: "Close-up of green ferns with natural lighting",
        title: "Green Ferns",
        photographer: "Izabelle Wilding",
      },
      {
        src: "/images/brazil-flower.JPG",
        alt: "Exotic flower from Brazil with detailed petals",
        title: "Brazilian Flower Detail",
        photographer: "Izabelle Wilding",
      },
      // Add more foliage images here
    ] as ImageMetadata[],
  },
};

interface GalleryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: GalleryPageProps) {
  const { slug } = await params;
  const gallery = galleryData[slug as keyof typeof galleryData];

  if (!gallery) {
    return {
      title: "Gallery | Belle and Beyond",
    };
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://belleandbeyond.com";
  const pageUrl = `${baseUrl}/gallery/${slug}`;
  const firstImage = gallery.images[0]?.src;
  const ogImage = firstImage ? `${baseUrl}${firstImage}` : undefined;

  return {
    title: `${gallery.title} Gallery | Belle and Beyond`,
    description: gallery.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${gallery.title} Gallery | Belle and Beyond`,
      description: gallery.description,
      type: "website",
      url: pageUrl,
      siteName: "Belle and Beyond",
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
      title: `${gallery.title} Gallery | Belle and Beyond`,
      description: gallery.description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { slug } = await params;
  const gallery = galleryData[slug as keyof typeof galleryData];

  if (!gallery) {
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
      contentUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "https://belleandbeyond.com"}${img.src}`,
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
            <p className="mt-6 text-md md:text-lg text-neutral-700 max-w-3xl">
              {gallery.description}
            </p>
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
  return Object.keys(galleryData).map((slug) => ({
    slug,
  }));
}

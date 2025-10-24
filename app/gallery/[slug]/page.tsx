import { notFound } from "next/navigation";
import { Navigation } from "../../components/navigation";
import { Footer } from "../../components/footer";

// Define the gallery data
const galleryData = {
  landscapes: {
    title: "Landscapes",
    description:
      "Quiet, far-flung corners where stillness meets landscape and story.",
    images: [
      "/images/algarve-clifs.JPG",
      "/images/algarve_sunset_zia_portrait.JPG",
      // Add more landscape images here
    ],
  },
  flora: {
    title: "Flora",
    description:
      "Echoes of the past captured in textures, artifacts, and timeless spaces.",
    images: [
      "/images/brazil-flower.JPG",
      "/images/ferns.JPG",
      "/images/hibiscus.JPG",
      "/images/brazil-flower.JPG",
      "/images/ferns.JPG",
      "/images/hibiscus.JPG",
      // Add more flora images here
    ],
  },
  people: {
    title: "People",
    description:
      "Clifftops, coves, and windswept meadows along a rugged coastline.",
    images: [
      "/images/zia-sunset.JPG",
      "/images/izzy_zia.JPG",
      // Add more people images here
    ],
  },
  foliage: {
    title: "Foliage",
    description:
      "Sunlit streets, tiled façades, and small discoveries in the city's rhythm.",
    images: [
      "/images/ferns.JPG",
      "/images/brazil-flower.JPG",
      // Add more foliage images here
    ],
  },
};

interface GalleryPageProps {
  params: {
    slug: string;
  };
}

export default function GalleryPage({ params }: GalleryPageProps) {
  const { slug } = params;
  const gallery = galleryData[slug as keyof typeof galleryData];

  if (!gallery) {
    notFound();
  }

  return (
    <div className="min-h-screen ">
      <Navigation />

      <main className="pt-24 md:pt-16">
        {/* Header */}
        <section className="bg-white py-24 md:py-0 md:pt-32 md:pb-8 px-4 md:px-10 lg:px-14 w-full">
          <div className="mb-12 md:mb-16">
            <div className="border-t border-neutral-400/70" />
            <h1 className="mt-8 text-5xl md:text-6xl font-serif text-neutral-900">
              {gallery.title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-neutral-700 max-w-3xl">
              {gallery.description}
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-24 md:pt-8 px-4 md:px-10 lg:px-14 w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }, (_, columnIndex) => (
              <div key={columnIndex} className="grid gap-4">
                {gallery.images
                  .filter((_, index) => index % 4 === columnIndex)
                  .map((image, imageIndex) => (
                    <div key={imageIndex}>
                      <img
                        className="h-auto max-w-full rounded-lg"
                        src={image}
                        alt={`${gallery.title} ${imageIndex + 1}`}
                      />
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

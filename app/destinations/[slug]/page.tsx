import { getDestinationBySlug, getAllDestinations } from "@/sanity/lib/api";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { Navigation } from "@/app/components/navigation";
import { Footer } from "@/app/components/footer";

// Generate static paths for all destinations
export async function generateStaticParams() {
  const destinations = await getAllDestinations();

  return destinations.map((destination: { slug: string }) => ({
    slug: destination.slug,
  }));
}

// Generate metadata for each destination page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const destination = await getDestinationBySlug(params.slug);

  if (!destination) {
    return {
      title: "Destination Not Found",
    };
  }

  return {
    title: `${destination.title} | Belle and Beyond`,
    description: destination.description,
  };
}

export default async function DestinationPage({
  params,
}: {
  params: { slug: string };
}) {
  const destination = await getDestinationBySlug(params.slug);

  if (!destination) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-bold mb-4">
            {destination.title}
          </h1>
          <p className="text-lg text-gray-600">{destination.description}</p>
        </div>

        {destination.mainImage && (
          <div className="relative h-[60vh] w-full mb-12">
            <Image
              src={destination.mainImage}
              alt={destination.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose max-w-none">
          {destination.content && <PortableText value={destination.content} />}
        </div>
      </div>
      <Footer />
    </>
  );
}

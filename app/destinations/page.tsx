import { Navigation } from "@/app/components/navigation";
import { Footer } from "@/app/components/footer";
import { getAllDestinations } from "@/sanity/lib/api";
import { DestinationCard } from "@/app/components/destination-card";
import Image from "next/image";

interface Destination {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
  mainImage?: string;
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Guides | Destinations | The Portable Life",
  description:
    "Explore comprehensive travel guides for destinations around the world. Expert travel guides from The Portable Life to help you plan your perfect trip. Discover the best places to visit, things to do, and travel tips.",
  keywords: [
    "travel guides",
    "destination guides",
    "travel destinations",
    "The Portable Life",
    "travel blog",
    "where to travel",
  ],
  openGraph: {
    title: "Travel Guides | Destinations | The Portable Life",
    description:
      "Explore comprehensive travel guides for destinations around the world. Expert travel guides to help you plan your perfect trip.",
    type: "website",
  },
};

export default async function DestinationsPage() {
  const allDestinations = await getAllDestinations();
  // Filter out "Travel Advice" and "Travel Tips" destinations (case-insensitive, check both title and slug)
  const destinations = allDestinations.filter((destination: Destination) => {
    const titleLower = destination.title?.toLowerCase() || "";
    const slugLower = destination.slug?.toLowerCase() || "";
    return (
      !titleLower.includes("travel advice") &&
      !slugLower.includes("travel-advice") &&
      !slugLower.includes("travel_advice") &&
      !titleLower.includes("travel tips") &&
      !slugLower.includes("travel-tips") &&
      !slugLower.includes("travel_tips")
    );
  });

  // Banner image - you can change this path to any image you want
  const bannerImage = "/images/la-de-rivas-view.JPG";

  return (
    <>
      <Navigation />

      {/* Banner Section */}
      <section className="relative w-full h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden">
        <Image
          src={bannerImage}
          alt="Travel Guides"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={85}
        />
        {/* Optional overlay for better text readability if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </section>

      <section className="bg-white py-24 md:py-20 px-4 md:px-10 lg:px-14 w-full">
        {/* Header: top rule + large serif heading */}
        <div className="mb-12 md:mb-16">
          <div className="border-t border-neutral-400/70" />
          <h1 className="mt-8 text-4xl md:text-5xl font-serif text-neutral-900">
            Travel Guides
          </h1>
          <p className="mt-4 text-lg md:text-xl text-neutral-700">
            Discover comprehensive travel guides for destinations around the
            world. Expert guides to help you plan your perfect adventure.
          </p>
        </div>

        <div className="grid gap-8 md:gap-10 sm:grid-cols-1 md:grid-cols-3">
          {destinations.map((destination: Destination) => (
            <DestinationCard
              key={destination._id}
              destination={{
                _id: destination._id,
                title: destination.title,
                slug: destination.slug,
                coverImage: destination.coverImage,
                mainImage: destination.mainImage,
                description: destination.description,
              }}
            />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

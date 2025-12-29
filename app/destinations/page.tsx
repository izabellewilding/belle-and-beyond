import { Navigation } from "@/app/components/navigation";
import { Footer } from "@/app/components/footer";
import { getAllDestinations } from "@/sanity/lib/api";
import { DestinationsGrid } from "@/app/components/destinations-grid";
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
  alternates: {
    canonical: `${
      process.env.NEXT_PUBLIC_SITE_URL || "https://theportablelife.blog"
    }/destinations`,
  },
  openGraph: {
    title: "Travel Guides | Destinations | The Portable Life",
    description:
      "Explore comprehensive travel guides for destinations around the world. Expert travel guides to help you plan your perfect trip.",
    type: "website",
    url: `${
      process.env.NEXT_PUBLIC_SITE_URL || "https://theportablelife.blog"
    }/destinations`,
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

      <section className="bg-[#faf7fa] w-full py-16 md:py-24">
        <div className="container-content">
          {/* Header */}
          <div className="mb-12 md:mb-16 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-darkText leading-tight mb-4">
              Destinations
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
              Discover comprehensive travel guides for destinations around the
              world. Expert guides to help you plan your perfect adventure.
            </p>
          </div>

          {/* Destinations Grid with wider container */}
          <div className="w-full max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
            <DestinationsGrid destinations={destinations} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

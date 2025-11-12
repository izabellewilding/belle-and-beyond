"use client";

import Image from "next/image";
import Link from "next/link";
import { trackDestinationView } from "@/lib/gtag";

interface DestinationCardProps {
  destination: {
    _id: string;
    title: string;
    slug: string;
    coverImage?: string;
    mainImage?: string;
    description?: string;
  };
  className?: string;
}

export const DestinationCard = ({
  destination,
  className = "",
}: DestinationCardProps) => {
  const href = `/destinations/${destination.slug}`;
  const imageUrl =
    destination.coverImage ||
    destination.mainImage ||
    "/images/destinations/placeholder.jpg";

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <Link
        href={href}
        className="block relative w-full aspect-[4/5] overflow-hidden rounded-3xl group"
        onClick={() => trackDestinationView(destination.title)}
      >
        <Image
          src={imageUrl}
          alt={destination.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(min-width: 1024px) 33vw, 100vw"
          priority={false}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 z-10" />
        {/* Title centered on image */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h3 className="text-2xl md:text-3xl leading-snug font-serif text-white text-center px-4">
            {destination.title}
          </h3>
        </div>
      </Link>
    </div>
  );
};

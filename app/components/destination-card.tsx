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
        className="block relative w-full aspect-[4/5] overflow-hidden rounded-3xl"
        onClick={() => trackDestinationView(destination.title)}
      >
        <Image
          src={imageUrl}
          alt={destination.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-[1.02]"
          sizes="(min-width: 1024px) 33vw, 100vw"
          priority={false}
        />
      </Link>
      <div className="mt-6 space-y-3">
        <Link
          href={href}
          onClick={() => trackDestinationView(destination.title)}
        >
          <h3 className="text-2xl md:text-2xl leading-snug font-serif text-neutral-900">
            {destination.title}
          </h3>
        </Link>
        {destination.description && (
          <p className="text-base text-neutral-600 line-clamp-2">
            {destination.description}
          </p>
        )}
      </div>
    </div>
  );
};

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { trackDestinationView } from "@/lib/gtag";

interface Destination {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  mainImage?: string;
}

interface DestinationsGridProps {
  destinations: Destination[];
}

export const DestinationsGrid = ({ destinations }: DestinationsGridProps) => {
  if (destinations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-600 text-lg">
          No destinations available yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      className="grid gap-8 md:gap-10 lg:gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center"
    >
      {destinations.map((destination) => {
        const imageUrl =
          destination.coverImage ||
          destination.mainImage ||
          "/images/destinations/placeholder.jpg";

        return (
          <motion.div
            key={destination._id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeOut",
                },
              },
            }}
            className="flex flex-col w-full"
          >
            <Link
              href={`/destinations/${destination.slug}`}
              onClick={() => trackDestinationView(destination.title)}
              className="group flex flex-col h-full transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Image with 4:3 aspect ratio and text overlay */}
              <div
                className="relative w-full overflow-hidden rounded-2xl mb-4 shadow-md group-hover:shadow-xl transition-shadow duration-300"
                style={{ aspectRatio: "4/3" }}
              >
                <Image
                  src={imageUrl}
                  alt={destination.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  priority={false}
                  quality={85}
                  loading="lazy"
                />
                {/* Text overlay centered on image */}
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl leading-snug font-sans font-bold text-white text-center px-4">
                    {destination.title}
                  </h3>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

"use client";

import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export const GalleryDirectory = () => {
  const controls = useAnimation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
    setIsLoaded(true);
  }, [controls]);

  const cards = [
    {
      title: "Landscapes",
      href: "/gallery/landscapes",
      src: "/images/algarve-clifs.JPG",
      description:
        "Quiet, far-flung corners where stillness meets landscape and story.",
    },
    {
      title: "Flora",
      href: "/gallery/flora",
      src: "/images/brazil-flower.JPG",
      description:
        "Echoes of the past captured in textures, artifacts, and timeless spaces.",
    },
    {
      title: "People",
      href: "/gallery/people",
      src: "/images/zia-sunset.JPG",
      description:
        "Clifftops, coves, and windswept meadows along a rugged coastline.",
    },
    {
      title: "foliage",
      href: "/gallery/foliage",
      src: "/images/ferns.JPG",
      description:
        "Sunlit streets, tiled façades, and small discoveries in the city's rhythm.",
    },
  ] as const;

  return (
    <section
      id="gallery"
      className="bg-white text-neutral-800 py-24 md:py-32 px-4 md:px-10 lg:px-14 w-full"
    >
      {/* Header to match blog section */}
      <div className="mb-12 md:mb-16">
        <div className="border-t border-neutral-400/70" />
        <h2 className="mt-8 text-5xl md:text-6xl font-serif text-neutral-900">
          Photo Gallery
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid grid-cols-2 gap-2"
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
            className="relative group"
          >
            <Link href={card.href} className="block">
              <div className="relative w-full aspect-square overflow-hidden rounded-lg">
                <Image
                  src={card.src}
                  alt={card.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(min-width: 1024px) 50vw, 50vw"
                  priority={index === 0}
                />
                {/* Overlay with title */}
                <div className="absolute inset-0 bg-black/20 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-serif text-2xl md:text-3xl text-white">
                    {card.title}
                  </h3>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

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
    { title: "Landscapes", href: "#landscapes", src: "/images/algarve-clifs.JPG", description: "Quiet, far-flung corners where stillness meets landscape and story." },
    { title: "Flora", href: "#flora", src: "/images/brazil-flower.JPG", description: "Echoes of the past captured in textures, artifacts, and timeless spaces." },
    { title: "People", href: "#people", src: "/images/zia-sunset.JPG", description: "Clifftops, coves, and windswept meadows along a rugged coastline." },
    { title: "foliage", href: "#foliage", src: "/images/ferns.JPG", description: "Sunlit streets, tiled façades, and small discoveries in the city’s rhythm." },
  ] as const;

  return (
    <section className="bg-white text-neutral-800 py-24 md:py-32 px-4 md:px-10 lg:px-14 w-full">
      {/* Header to match blog section */}
      <div className="mb-12 md:mb-16">
        <div className="border-t border-neutral-400/70" />
        <h2 className="mt-8 text-5xl md:text-6xl font-serif text-neutral-900">Gallery</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2"
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
          >
            <Link href={card.href} className="block group">
              <div className="rounded-3xl bg-[#e4e2e3] p-8 md:p-12">
                <h3 className="font-serif text-4xl md:text-5xl text-neutral-900 mb-10 md:mb-16">{card.title}</h3>
                {card.description && (
                  <p className="text-neutral-700 md:text-lg max-w-[46ch] mb-8 md:mb-12">
                    {card.description}
                  </p>
                )}
                {/* Portrait container with square corners; object-cover crops landscape images */}
                <div className="relative w-full aspect-[3/4] overflow-hidden">
                  <Image
                    src={card.src}
                    alt={card.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority={index === 0}
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};


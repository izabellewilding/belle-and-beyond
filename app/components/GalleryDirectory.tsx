"use client";

import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface GalleryCard {
  title: string;
  href: string;
  src: string;
  description: string;
}

interface GalleryDirectoryProps {
  cards: GalleryCard[];
}

export const GalleryDirectory = ({ cards }: GalleryDirectoryProps) => {
  const controls = useAnimation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
    setIsLoaded(true);
  }, [controls]);

  return (
    <section
      id="gallery"
      className="bg-white text-darkText pb-16 md:pb-24 px-4 md:px-10 lg:px-14 w-full"
    >
      {/* Border line at top */}
      <div className="border-t border-neutral-400/70 pt-16 md:pt-24 mb-8 md:mb-12">
        {/* Header */}
        <div>
          <h2 className="text-3xl md:text-4xl font-serif text-darkText">
            Photo Gallery
          </h2>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-2"
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
                  sizes="(min-width: 768px) 33vw, 100vw"
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

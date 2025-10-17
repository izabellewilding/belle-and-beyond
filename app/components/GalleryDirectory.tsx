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
    { title: "Remote places", href: "#beaches", src: "/images/car.JPG" },
    { title: "History", href: "#history", src: "/images/mirror.JPG" },
    { title: "West Wales", href: "#wales", src: "/images/flower.JPG" },
  ] as const;

  return (
    <section className="bg-[#DFDBD8] text-neutral-800 h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid grid-rows-3 gap-4 h-full overflow-hidden"
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            className="h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
          >
            <Link href={card.href} className="block h-full">
              <div className="relative w-full h-full">
                <Image
                  src={card.src}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/10 transition-colors" />
                <div className="absolute bottom-3 left-4">
                  <span className="inline-block rounded-full bg-white/85 px-4 py-2 text-sm md:text-base font-medium text-neutral-900">
                    {card.title}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};


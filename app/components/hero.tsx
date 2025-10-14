"use client";

import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const controls = useAnimation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
    setIsLoaded(true);
  }, [controls]);

  const cards = [
    {
      title: "Hidden Beaches",
      href: "#beaches",
      src: "/images/algarve_sunset_zia_portrait.JPG",
    },
    {
      title: "Mountain Trails",
      href: "#mountains",
      src: "/images/algarve_sunset_zia_portrait.JPG",
    },
    {
      title: "City Escapes",
      href: "#cities",
      src: "/images/algarve_sunset_zia_portrait.JPG",
    },
  ] as const;

  return (
    <main className="bg-[#DFDBD8] text-neutral-800">
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {/* LEFT SIDE: Image */}
        <div className="relative w-full h-[50vh] md:h-auto">
          <Image
            src="/images/algarve_sunset_zia_portrait.JPG"
            alt="Sunset in Puerto Viejo"
            fill
            className="object-cover"
            priority
          />
          {/* Optional overlay for aesthetic */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* RIGHT SIDE: 3 stacked rectangular cards filling column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          style={{ opacity }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-stretch justify-stretch px-0 md:px-0 lg:px-0 py-0 bg-[#DFDBD8] h-full"
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              className="flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
            >
              <Link href={card.href} className="group block h-full">
                <div className="relative w-full h-full">
                  <Image
                    src={card.src}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                  <div className="absolute bottom-3 left-4 right-auto">
                    <div className="inline-block rounded-full bg-white/85 px-4 py-2 text-sm md:text-base font-medium text-neutral-900">
                      {card.title}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}

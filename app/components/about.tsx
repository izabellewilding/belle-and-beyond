"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const About = () => {
  return (
    <section className="bg-white py-24 md:py-32 px-4 md:px-10 lg:px-14 w-full">
      {/* Header with top rule */}
      <div className="mb-12 md:mb-16">
        <div className="border-t border-neutral-400/70" />
      </div>

      {/* About content with portrait image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <p className="text-5xl md:text-6xl text-neutral-800 leading-tight font-serif max-w-4xl">
          We are a boutique photography studio focused on crafting visual
          stories that resonate. Blending candid authenticity with refined
          composition, our mission is to highlight the beauty in everyday
          moments while providing an effortless client experience from first
          consultation to final delivery.
        </p>

        {/* Portrait image in bottom right */}
        <div className="absolute bottom-0 right-0 w-80 md:w-96 lg:w-[28rem] aspect-[3/4]">
          <Image
            src="/images/algarve_sunset_zia_portrait.JPG"
            alt="Portrait"
            fill
            className="object-cover rounded-2xl"
            sizes="(min-width: 1024px) 28rem, (min-width: 768px) 24rem, 20rem"
          />
        </div>
      </motion.div>
    </section>
  );
};

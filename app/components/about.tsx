"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const About = () => {
  return (
    <section
      id="our-story"
      className="bg-white py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-10 lg:px-14 w-full"
    >
      {/* Header with top rule */}
      <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
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
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-800 leading-tight font-serif max-w-4xl">
          We’re fully remote software engineers who love exploring beyond the
          usual paths. From coding on the road to finding peace in nature, we’re
          always chasing new experiences in far-flung places. We spent a few
          unforgettable months living in Costa Rica, where our love for wild
          landscapes grew even stronger. I’m also an artist and photographer,
          inspired by the people and places we encounter. Our goal is simple —
          to share honest stories and real travel tips, without the fake gloss
          you find all too often online.
        </p>

        {/* Portrait image in bottom right */}
        <div className="absolute bottom-0 right-0 w-48 sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] aspect-[3/4]">
          <Image
            src="/images/algarve_sunset_zia_portrait.JPG"
            alt="Portrait"
            fill
            className="object-cover rounded-2xl"
            sizes="(min-width: 1280px) 28rem, (min-width: 1024px) 24rem, (min-width: 768px) 20rem, (min-width: 640px) 16rem, 12rem"
          />
        </div>
      </motion.div>
    </section>
  );
};

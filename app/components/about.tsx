"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const About = () => {
  return (
    <section
      id="our-story"
      className="min-h-screen w-full flex flex-col lg:flex-row m-0 p-0 bg-[#f7e9e9]"
    >
      {/* Left Section - Tilted Photo */}
      <div className="relative w-full lg:w-[45%] h-[50vh] lg:h-screen flex items-center justify-center lg:justify-end pr-0 lg:pr-8 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-md lg:max-w-lg h-[calc(80%-100px)] lg:h-[calc(85%-100px)]"
        >
          {/* Dark background layer */}
          <div className="absolute inset-0 bg-neutral-900 rotate-2 lg:rotate-3 transform origin-center" />

          {/* Image */}
          <div className="relative w-full h-full p-4 -rotate-2 lg:-rotate-3 transform origin-center">
            <Image
              src="/images/izzy_zia.JPG"
              alt="Izabelle and Zia, digital nomads"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
        </motion.div>
      </div>

      {/* Right Section - Text Content */}
      <div className="w-full lg:w-[55%] h-[50vh] lg:h-screen flex items-center justify-center bg-[#f7e9e9] px-6 md:px-10 lg:px-12 xl:px-16 py-12 lg:py-0">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl space-y-6 md:space-y-8"
        >
          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-neutral-900 leading-tight">
            honest travel reviews, guides, and experiences as nomads
          </h2>

          {/* Welcome Message */}
          <p className="text-lg md:text-xl text-neutral-800 font-sans">
            Welcome, we are so pleased you found us!
          </p>

          {/* Introduction */}
          <p className="text-base md:text-lg text-neutral-800 font-sans leading-relaxed">
            We're Izabelle & Zia, digital nomads who spend our weekends
            exploring and immersing ourselves in new cultures.
          </p>

          {/* Mission Statement */}
          <p className="text-base md:text-lg text-neutral-800 font-sans leading-relaxed">
            We want to share our experiences to help you. We write authentic
            stories and aim to give you the full picture, not just the fluff.
          </p>

          {/* Blog Status */}
          <p className="text-base md:text-lg text-neutral-800 font-sans leading-relaxed">
            The blog is just starting out and we're hoping to keep growing!
          </p>

          {/* Blog Link */}
          <div className="pt-4">
            <Link
              href="/blog"
              className="text-neutral-600 hover:text-neutral-800 text-sm md:text-base font-sans transition-colors"
            >
              our blog
            </Link>
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <Link
              href="/blog"
              className="inline-block bg-neutral-900 text-white px-8 py-4 rounded-lg text-base md:text-lg font-sans hover:bg-neutral-800 transition-colors"
            >
              See our stories
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

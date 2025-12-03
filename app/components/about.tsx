"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect - image moves slower than scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      id="our-story"
      className="relative min-h-screen w-full flex flex-col lg:flex-row m-0 p-0 bg-[#EAC4C5] overflow-hidden z-30"
    >
      {/* Transparent fade at top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#EAC4C5] z-10 pointer-events-none" />
      {/* Left Section - Tilted Photo */}
      <div className="relative w-full lg:w-[45%] h-[50vh] lg:h-screen flex items-center justify-center lg:justify-end px-6 pb-6 lg:px-0 lg:pb-0 lg:pr-4 overflow-visible">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-md lg:max-w-lg h-[calc(80%-100px)] lg:h-[calc(85%-100px)]"
        >
          {/* Dark background layer */}
          <div className="absolute inset-0 bg-[#172531] rotate-2 lg:rotate-3 transform origin-center" />

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
      <div className="w-full lg:w-[55%] h-[50vh] lg:h-screen flex items-center justify-center bg-[#EAC4C5] px-6 md:px-10 lg:pl-4 lg:-ml-8 lg:pr-20 xl:pl-8 xl:-ml-12 xl:pr-24 py-12 lg:py-0">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl space-y-6 md:space-y-10"
        >
          {/* Main Heading */}
          <h2 className="text-xl md:text-2xl lg:text-4xl font-playfair font-bold text-darkText leading-tight">
            Exploring what it feels like to build a life in new places — from
            practical experiences to everyday discoveries.
          </h2>

          {/* Welcome Message */}
          <p className="text-lg md:text-xl text-darkText font-sans">
            Welcome, we are so pleased you found us!
          </p>

          {/* Introduction */}
          <p className="text-base md:text-lg text-darkText font-sans leading-relaxed">
            We're Izabelle & Zia, digital nomads who spend our weekends
            exploring and immersing ourselves in new cultures.
          </p>

          {/* Mission Statement */}
          <p className="text-base md:text-lg text-darkText font-sans leading-relaxed">
            We want to share our experiences to help you. We write authentic
            stories and aim to give you the full picture, not just the fluff.
          </p>

          {/* Blog Status */}
          <p className="text-base md:text-lg text-darkText font-sans leading-relaxed">
            The blog is just starting out and we're hoping to keep growing!
          </p>

          {/* CTA Button */}
          <div className="pt-2 w-full">
            <Link
              href="/blog"
              className="inline-block w-full sm:w-auto bg-[#423636] text-white px-8 py-4 rounded-none text-base md:text-lg font-sans hover:bg-[#352d2d] transition-colors text-center"
            >
              See our stories
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

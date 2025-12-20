"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { RectangularButton } from "./rectangular-button";

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect - image moves slower than scroll (currently unused)
  // const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      id="our-story"
      className="relative min-h-screen w-full flex flex-col xl:flex-row m-0 p-0 bg-[#ffeced] overflow-x-hidden overflow-y-visible z-30"
    >
      {/* Left Section - Tilted Photo */}
      <div className="relative w-full xl:w-[45%] h-[50vh] xl:h-screen flex items-center justify-center xl:justify-end px-6 pt-6  xl:px-0 xl:pt-0 xl:pb-0 xl:pr-10 overflow-visible z-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-sm aspect-square xl:max-w-lg xl:aspect-auto xl:h-[calc(85%-100px)]"
        >
          {/* Dark background layer */}
          <div className="absolute inset-0 bg-[#172531] rotate-2 xl:rotate-3 transform origin-center" />

          {/* Image */}
          <div className="relative w-full h-full p-3 xl:p-4 -rotate-2 xl:-rotate-3 transform origin-center">
            <Image
              src="/images/izzy.jpeg"
              alt="Izabelle and Zia, digital nomads"
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 45vw, 100vw"
            />
          </div>
        </motion.div>
      </div>

      {/* Right Section - Text Content */}
      <div className="relative w-full max-w-[700px] xl:max-w-none xl:w-[55%] h-auto xl:h-screen flex items-center justify-center bg-[#ffeced] px-6 md:px-10 xl:pl-10 xl:-ml-6 xl:pr-24 pt-8 xl:pt-0 pb-20 xl:pb-0 xl:mx-0 mx-auto">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl space-y-6 md:space-y-7 w-full"
        >
          {/* Main Heading */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-darkText leading-tight pb-8">
            Welcome ❤︎
          </h2>

          {/* Introduction */}
          <p className="text-base md:text-lg text-darkText font-sans leading-relaxed">
            I'm Izabelle, a software engineer-turned-digital-nomad. I spend my
            days working remotely and weekends exploring.
          </p>

          {/* Problem Statement */}
          <p className="text-base md:text-lg text-darkText font-sans leading-relaxed">
            After years of travelling, I realised how hard it can be to find
            honest information — the kind that tells you what a destination is
            really like for remote workers.
          </p>

          {/* What We Share */}
          <div className="text-base md:text-lg text-darkText font-sans leading-relaxed">
            <p className="mb-2">
              I created this space to share genuine experiences (the good and
              the not-so-perfect), practical guides for aspiring digital nomads,
              tips on where to stay, work, eat, and explore, and what life
              abroad is actually like.
            </p>
          </div>

          {/* Goal */}
          <p className="text-base md:text-lg text-darkText pb-4 font-sans leading-relaxed">
            My goal is simple: to help you feel confident choosing your next
            adventure.
          </p>

          {/* CTA Button */}
          <div className="pt-2 pb-4 inline-block">
            <RectangularButton href="/blog" text="Read my stories" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

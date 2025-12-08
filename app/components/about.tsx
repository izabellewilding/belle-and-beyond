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

  // Parallax effect - image moves slower than scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      id="our-story"
      className="relative min-h-screen w-full flex flex-col lg:flex-row m-0 p-0 bg-[#EAC4C5] overflow-x-hidden overflow-y-visible z-30"
    >
      {/* Left Section - Tilted Photo */}
      <div className="relative w-full lg:w-[45%] h-[50vh] lg:h-screen flex items-center justify-center lg:justify-end px-6 pb-6 lg:px-0 lg:pb-0 lg:pr-4 overflow-visible z-20">
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
      <div className="relative w-full lg:w-[55%] h-auto lg:h-screen flex items-center justify-center bg-[#EAC4C5] px-6 md:px-10 lg:pl-4 lg:-ml-8 lg:pr-20 xl:pl-8 xl:-ml-12 xl:pr-24 py-12 lg:py-0 pb-20 lg:pb-0">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl space-y-6 md:space-y-10 w-full"
        >
          {/* Main Heading */}
          <h2 className="text-xl md:text-2xl lg:text-4xl font-playfair font-bold text-darkText leading-tight">
            Welcome to our blog! — we're so happy you're here.
          </h2>

          {/* Introduction */}
          <p className="text-base md:text-lg text-darkText font-sans leading-relaxed">
            We're Izabelle & Zia, two engineers-turned-digital-nomads who spend
            our days working remotely and our weekends exploring new places.
          </p>

          {/* Problem Statement */}
          <p className="text-base md:text-lg text-darkText font-sans leading-relaxed">
            After years of travelling, we realised how hard it can be to find
            honest information — the kind that tells you what a destination is
            really like for remote workers.
          </p>

          {/* What We Share */}
          <div className="text-base md:text-lg text-darkText font-sans leading-relaxed">
            <p className="mb-2">So we created this space to share:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>genuine experiences (the good and the not-so-perfect)</li>
              <li>practical guides for aspiring digital nomads</li>
              <li>tips on where to stay, work, eat, and explore</li>
              <li>what life abroad is actually like</li>
            </ul>
          </div>

          {/* Goal */}
          <p className="text-base md:text-lg text-darkText font-sans leading-relaxed">
            Our goal is simple: to help you feel confident choosing your next
            adventure.
          </p>

          {/* Blog Status */}
          <p className="text-base md:text-lg text-darkText font-sans leading-relaxed">
            This blog is just getting started, but we're excited to keep growing
            and to bring you along with us.
          </p>

          {/* CTA Button */}
          <div className="pt-2 pb-4 w-full">
            <RectangularButton
              href="/blog"
              text="See our stories"
              className="w-full sm:w-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

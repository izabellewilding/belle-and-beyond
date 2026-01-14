"use client";

import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { RectangularButton } from "./rectangular-button";

export const Hero = () => {
  const controls = useAnimation();
  const heroRef = useRef<HTMLElement>(null);

  // Parallax effect - hero moves slower than scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Transform scroll to move hero slower (parallax effect)
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full m-0 p-0 overflow-hidden block z-0"
    >
      {/* Full width and height image container */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={controls}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/images/dominical-surfer.jpg"
          alt="Tropical beach scene"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Gradient overlay from bottom to top */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/45 to-black/15 z-10" />

      {/* Centered Hero Text */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="text-center px-8 md:px-8">
          <h1 className="text-[52px]  md:text-6xl lg:text-7xl font-playfair font-extrabold text-[#F2E9F1] mb-8 md:mb-6 leading-tight">
            The World Awaits You
            <br />
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl md:text-xl lg:text-2xl text-[#e3d3dd] font-sans max-w-[400px] m-auto sm:max-w-[700px]"
          >
            Curated travel guides, destination insights, and adventures from
            around the globe to inspire your next adventure.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 pointer-events-auto"
          >
            <RectangularButton
              text="Get Inspired"
              href="/blog"
              variant="gold"
              icon={false}
              className="w-[85%] max-w-[250px] md:w-auto md:max-w-none px-10 md:px-14 py-4 md:py-5 text-lg md:text-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

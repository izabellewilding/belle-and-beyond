"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

export const About = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <section className="relative min-h-[100vh] w-full text-neutral-800 overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      >
        <Image
          src="/about.jpg"
          alt="Nature background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/10" /> {/* Subtle overlay */}
      </motion.div>

      {/* Centered Content */}
      <div className="flex items-center justify-center min-h-screen px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-md rounded-lg p-12 max-w-2xl text-center shadow-2xl border border-white/20"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-2xl md:text-3xl font-serif mb-8 text-gray-900"
          >
            About Me
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="text-gray-800 mb-8 text-lg md:text-xl leading-relaxed">
              Hey! I'm Izabelle Wilding — a photographer, web developer, and
              traveller. Originally from the UK, I'm currently based in Tbilisi,
              Georgia.
            </p>
            <p className="text-gray-800 mb-8 text-lg md:text-xl leading-relaxed">
              I'm drawn to the quiet beauty of nature, unexpected moments, and
              the raw, soulful charm of old, rustic places.
            </p>
            <p className="text-gray-800 text-lg md:text-xl leading-relaxed">
              Through honest travel guides and vivid imagery, I hope to inspire
              you to explore new destinations and see the world (and yourself) a
              little differently.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

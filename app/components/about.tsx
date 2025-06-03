"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Button } from "./button";

export const About = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <section className="relative min-h-[100vh] w-full text-neutral-800 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/about.jpg')",
          }}
        />
      </div>

      {/* Centered Content */}
      <div className="flex items-center justify-center min-h-screen px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#ffffffaf] backdrop-blur-lg rounded-xl p-10 max-w-2xl text-center shadow-xl"
        >
          <h2 className="text-xl md:text-2xl font-serif font-bold mb-6 text-gray-900">
            About Me
          </h2>
          <p className="text-gray-800 mb-8 text-lg leading-relaxed">
            Hey! I'm Izabelle Wilding — a photographer, web developer, and
            traveller. Originally from the UK, I’m currently based in Tbilisi,
            Georgia. I’m drawn to the quiet beauty of nature, unexpected
            moments, and the raw, soulful charm of old, rustic places. Through
            honest travel guides and vivid imagery, I hope to inspire you to
            explore new destinations and see the world (and yourself) a little
            differently.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

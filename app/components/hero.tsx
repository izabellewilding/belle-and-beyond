"use client";

import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Button } from "./button";

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 50]);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <main className="bg-gray-50 text-neutral-800 max-w-[1600px] mx-auto">
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-64px)] relative items-center">
        {/* Left: Text Content in Blurred Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 p-10 flex flex-col justify-center bg-white/60 backdrop-blur-lg md:rounded-r-3xl shadow-md"
        >
          <p className="text-base mb-6 leading-tight text-gray-700">
            Travel guides & inspiring ideas
          </p>
          <h2 className="text-4xl md:text-3xl font-bold mb-4 leading-tight text-gray-900">
            Discover your next adventure
          </h2>

          <p className="text-gray-600 mb-12 text-lg leading-relaxed">
            Hey! I'm <strong>Izabelle Wilding</strong>, a photographer, web
            developer and traveller. Currently a digital nomad, I've been living
            in Tbilisi, Georgia for a month. I'm drawn to the quiet beauty of
            nature, little surprises, and the raw, authentic feel of old, rustic
            places. I believe travel isn't just about ticking off
            destinations—it's about finding those unexpected, peaceful moments
            that stay with you.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <Button text="Visit Blog" href="#blog" />
            <Button text="See Destinations" href="#destinations" outline />
          </div>
        </motion.div>

        {/* Right: Parallax Background Image */}
        <div className="relative h-[50vh] md:h-[85vh]">
          <motion.div
            style={{ y }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <div
              className="w-full h-full bg-cover bg-center md:rounded-l-3xl"
              style={{
                backgroundImage: "url('/images/sunset-puerto-viejo.png')",
              }}
            />
          </motion.div>

          {/* Glassmorphism Panel for Small Screens */}
          <div className="md:hidden absolute bottom-0 w-full p-6 bg-white/30 backdrop-blur-lg rounded-t-3xl shadow-lg text-center text-white">
            <p className="text-base font-medium">
              Discover calm in the chaos, and stories behind every sunset.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

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
    <main className="bg-[#DFDBD8] text-center text-neutral-800 max-w-[1600px] mx-auto">
      <section
        style={{ backgroundImage: "url('/images/sunset-puerto-viejo.png')" }}
        className="grid grid-cols-1 md:grid-cols-1 min-h-[calc(100vh-64px)] items-center"
      >
        {/* Right: Parallax Background Image */}

        {/* Left: Text Content in Blurred Box */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 p-10 flex flex-col justify-center items-center"
        >
          <p className="text-base mb-6 leading-tight text-gray-700">
            Travel guides & inspiring ideas
          </p>
          <h2 className="text-3xl font-serif md:text-4xl font-bold mb-8 leading-tight text-gray-900">
            Discover your next adventure
          </h2>

          {/* <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Hey! I'm <strong>Izabelle Wilding</strong>, a photographer, web
            developer and traveller. Currently a digital nomad, I've been living
            in Tbilisi, Georgia for a month. I'm drawn to the quiet beauty of
            nature, little surprises, and the raw, authentic feel of old, rustic
            places. I believe travel isn't just about ticking off
            destinations—it's about finding those unexpected, peaceful moments
            that stay with you.
          </p> */}

          <div className="flex flex-col md:flex-row gap-4">
            <Button text="Visit Blog" href="#blog" />
            <Button text="Discover" href="#destinations" outline />
          </div>

          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mt-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Glassmorphism Panel for Small Screens */}
        <div className="md:hidden absolute bottom-0 w-full p-6 bg-white/30 backdrop-blur-lg rounded-t-3xl shadow-lg text-center text-white">
          <p className="text-base font-medium">
            Discover calm in the chaos, and stories behind every sunset.
          </p>
        </div>
      </section>
    </main>
  );
};

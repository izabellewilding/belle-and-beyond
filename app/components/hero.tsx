"use client";

import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "./button";

export const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const controls = useAnimation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
    setIsLoaded(true);
  }, [controls]);

  return (
    <main className="bg-[#DFDBD8] text-center text-neutral-800 max-w-[1600px] mx-auto">
      <section
        style={{ backgroundImage: "url('/images/sunset-puerto-viejo.png')" }}
        className="grid grid-cols-1 md:grid-cols-1 min-h-screen items-center bg-cover bg-center relative"
      >
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          style={{ opacity }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 p-10 flex flex-col justify-center items-center max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 10 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base mb-6 leading-tight text-gray-100 tracking-wide uppercase"
          >
            Travel guides & inspiring ideas
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl font-serif md:text-6xl mb-8 leading-tight text-white"
          >
            Discover your next adventure
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col md:flex-row gap-4"
          >
            <Button text="Visit Blog" href="#blog" />
            <Button text="Discover" href="#destinations" outline />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: isLoaded ? 1 : 0,
              y: isLoaded ? [0, 10, 0] : 0,
            }}
            transition={{
              opacity: { delay: 1.2, duration: 0.6 },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
            className="mt-16"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-white/80"
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
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: isLoaded ? 0 : 100 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="md:hidden fixed bottom-0 w-full p-6 bg-white/10 backdrop-blur-lg rounded-t-3xl shadow-lg text-center"
        >
          <p className="text-base font-medium text-white">
            Discover calm in the chaos, and stories behind every sunset.
          </p>
        </motion.div>
      </section>
    </main>
  );
};

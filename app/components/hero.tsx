"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <section className="relative text-neutral-800 flex items-center justify-center pt-8 md:pt-12 lg:pt-16">
      <div className="w-full">
        {/* Full width image container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={controls}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full aspect-[3/4] lg:aspect-[16/8] overflow-hidden"
        >
          <Image
            src="/images/la-de-rivas-view.JPG"
            alt="Hero image"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 100vw, (min-width: 768px) 90vw, 100vw"
          />

          {/* Overlay gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30" />

          {/* Text overlay centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative z-10 px-4 md:px-12 lg:px-20 xl:px-24 max-w-3xl text-center">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-white mb-3 md:mb-6"
              >
                Explore the world
                <br />
                with us
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
                className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl mb-6 md:mb-10 max-w-xl mx-auto leading-relaxed"
              >
                We want to share our experiences and trips so that you can find
                inspiration for your own adventures.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center"
              >
                <Link
                  href="/destinations"
                  className="inline-flex items-center justify-center gap-1.5 md:gap-2 bg-white text-neutral-900 px-6 py-3 md:px-8 md:py-4 rounded-full font-medium text-base md:text-base lg:text-lg hover:bg-neutral-100 transition-colors duration-200 shadow-lg w-full md:w-auto"
                >
                  Explore Destinations
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <Link
                  href="/blog"
                  className="hidden md:inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-medium text-base lg:text-lg hover:bg-white hover:text-neutral-900 transition-colors duration-200"
                >
                  Read Stories
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

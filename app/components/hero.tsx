"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

export const Hero = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <section className="relative text-neutral-800 min-h-screen flex items-center justify-center px-4 md:px-8 py-12 md:py-20">
      <div className="w-full max-w-7xl mx-auto">
        {/* Centered rounded image container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={controls}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl"
        >
          <Image
            src="/images/algarve_sunset_zia_portrait.JPG"
            alt="Hero image"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 100vw, (min-width: 768px) 90vw, 100vw"
          />

          {/* Overlay gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

          {/* Text overlay on the left */}
          <div className="absolute inset-0 flex items-center">
            <div className="relative z-10 px-6 md:px-12 lg:px-16 max-w-2xl">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                className="font-sans text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-white mb-4 md:mb-6"
              >
                Travel
                <br />
                with us
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
                className="text-white/90 text-base md:text-lg lg:text-xl mb-8 md:mb-10 max-w-xl leading-relaxed"
              >
                Take a journey with us as we explore the world and share our
                experiences.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="/destinations"
                  className="inline-flex items-center justify-center gap-2 bg-white text-neutral-900 px-8 py-4 rounded-full font-medium text-base md:text-lg hover:bg-neutral-100 transition-colors duration-200 shadow-lg"
                >
                  Explore Destinations
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
                </a>
                <a
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-medium text-base md:text-lg hover:bg-white hover:text-neutral-900 transition-colors duration-200"
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
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

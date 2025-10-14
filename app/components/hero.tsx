"use client";

import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "./button";
import Image from "next/image";

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
    <main className="bg-[#DFDBD8] text-neutral-800">
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {/* LEFT SIDE: Image */}
        <div className="relative w-full h-[50vh] md:h-auto">
          <Image
            src="/images/algarve_sunset_zia_portrait.JPG"
            alt="Sunset in Puerto Viejo"
            fill
            className="object-cover"
            priority
          />
          {/* Optional overlay for aesthetic */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* RIGHT SIDE: Text + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          style={{ opacity }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center items-start px-10 md:px-16 lg:px-24 py-12 bg-[#DFDBD8]"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-6xl font-sans text-neutral-900 mb-6 leading-tight"
          >
            Beyond Borders Travel
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 10 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-neutral-700 mb-8 max-w-md"
          >
            Discover calm in the chaos and the stories behind every sunset.
            Explore destinations that inspire creativity and connection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 10 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Button text="Discover More" href="#destinations" />
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
};

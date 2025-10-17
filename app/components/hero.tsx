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
    <section className="relative text-neutral-800 h-screen">
      {/* Right-anchored content block so title aligns with image left edge */}
      <div className="absolute right-0 bottom-0 w-[96vw] md:w-[88vw] lg:w-[82vw] px-6 md:px-10 lg:px-14 pb-6 md:pb-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={controls}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-sans text-5xl md:text-8xl leading-[1.1] tracking-tight text-neutral-900 mb-4 md:mb-6"
        >
          Moments In Focus
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="relative w-full aspect-[[16/9]] md:aspect-[18/9] rounded-2xl overflow-hidden"
        >
          <Image
            src="/images/algarve_sunset_zia_portrait.JPG"
            alt="Hero image"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 82vw, (min-width: 768px) 88vw, 96vw"
          />
        </motion.div>
      </div>
    </section>
  );
}

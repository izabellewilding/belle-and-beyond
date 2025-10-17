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
    <section className="relative bg-[#e4e2e3] text-neutral-800 h-[90vh] md:h-screen">
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-14 pt-16 md:pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={controls}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-sans text-5xl md:text-7xl leading-[1.1] tracking-tight text-neutral-900"
        >
          Moments In Focus
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="absolute bottom-0 right-0 w-[92vw] md:w-[72vw] lg:w-[68vw] aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden"
      >
        <Image
          src="/images/algarve_sunset_zia_portrait.JPG"
          alt="Hero image"
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 68vw, (min-width: 768px) 72vw, 92vw"
        />
      </motion.div>
    </section>
  );
}

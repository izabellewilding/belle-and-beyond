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
    <section className="relative min-h-screen w-full m-0 p-0 overflow-hidden block">
      {/* Full width and height image container */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={controls}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/images/dominical-surfer.JPG"
          alt="Tropical beach scene"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Logo in top left */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
        <Link href="/" className="block">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="relative brightness-0 invert"
          >
            <Image
              src="/logo.svg"
              alt="Izzia Travel"
              width={240}
              height={75}
              className="h-12 md:h-16 lg:h-20 w-auto"
              priority
            />
          </motion.div>
        </Link>
      </div>

      {/* Optional: Subtle text overlay if needed - can be removed or customized */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        {/* Add any centered content here if needed */}
      </div>
    </section>
  );
};

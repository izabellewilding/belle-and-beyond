"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export const DominicalFeature = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row">
      {/* Title - Artistically placed higher up and more to the right */}
      <div className="absolute top-20 md:top-24 left-[55%] md:left-[60%] z-30 pointer-events-none">
        <h2 className="text-7xl md:text-8xl lg:text-9xl font-sans font-bold text-[#DDD0D0] whitespace-nowrap">
          Dominical
        </h2>
      </div>

      {/* Left Section - Text Content */}
      <div className="relative w-full md:w-1/2 bg-[#33454D] flex items-end justify-center pb-8 md:pb-12 lg:pb-16 px-8 md:px-12 lg:px-16 min-h-screen">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-lg space-y-6 z-10 w-full"
        >
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-[#A2CADC] leading-tight">
            Check out our latest trip to the surf town of Dominical
          </h3>
          <p className="text-base md:text-lg text-[#A2CADC] font-sans leading-relaxed">
            We loved our recent visit to Dominical, La Pos Azul, and
            Dominicalito. We had some amazing food at Fuego and really felt the
            surfing spirit.
          </p>
          <Link
            href="/blog/dominical"
            className="inline-block mt-6 bg-white text-[#33454D] px-8 py-4 rounded-none text-base md:text-lg font-sans hover:bg-white/90 transition-colors"
          >
            Read More
          </Link>
        </motion.div>
      </div>

      {/* Right Section - Image with background and small padding */}
      <div className="relative w-full md:w-1/2 min-h-screen flex items-center justify-center p-4 md:p-6 bg-white">
        <div className="relative w-full max-w-md aspect-[3/4]">
          <Image
            src="/images/dominical-surfer.jpg"
            alt="Waterfall in Dominical, Costa Rica"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
};

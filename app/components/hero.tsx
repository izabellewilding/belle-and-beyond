// components/Hero.tsx
"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { Button } from "./button";

export const Hero = () => {
  const imageRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -100]);

  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <main className="bg-gray-50 text-neutral-800">
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-64px)] relative">
        {/* TEXT ON LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 p-10 flex flex-col justify-center bg-gray-50/80 backdrop-blur-lg md:backdrop-blur-0"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-gray-900">
            Adventure into the Wild
          </h2>

          <p className="text-gray-600 mb-6 text-base leading-relaxed">
            Hi there, I'm Izabelle Wilding, a photographer, web developer and
            traveller. Currently a digital nomad, I've been living in Tbilisi,
            Georgia for a month and loving it here! I&apos;m drawn to the quiet
            beauty of nature, little surprises, and the raw, authentic feel of
            old, rustic places. I believe travel isn&apos;t just about ticking
            off destinations—it&apos;s about finding those unexpected, peaceful
            moments that stay with you. I love exploring popular places
            differently: <strong>finding stillness in the noise</strong>, charm
            in the old and rustic, and magic in the unplanned. Here, you&apos;ll
            find practical travel tips and guides to help you do the same.
          </p>

          <div className="flex gap-4">
            <Button text="Visit Blog" href="/blog" />
            <button className="border border-gray-300 text-gray-700 px-5 py-2 rounded-full hover:border-gray-500 transition">
              See Destinations
            </button>
          </div>
        </motion.div>

        {/* PARALLAX IMAGE ON RIGHT */}
        <div className="relative h-[50vh] md:h-full overflow-hidden">
          <motion.div
            ref={imageRef}
            style={{ y }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <Image
              src="/images/sunset-puerto-viejo.png"
              alt="Scenic beach"
              fill
              className="object-cover rounded-none md:rounded-l-3xl"
              priority
            />
          </motion.div>

          {/* GLASSMORPHISM PANEL FOR SMALL SCREENS */}
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

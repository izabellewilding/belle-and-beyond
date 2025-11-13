"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const About = () => {
  return (
    <section
      id="our-story"
      className="bg-white pb-16 md:pb-24 px-4 sm:px-6 md:px-10 lg:px-14 w-full"
    >
      {/* Border line at top */}
      <div className="border-t border-neutral-400/70 pt-16 md:pt-24 mb-8 md:mb-12">
        {/* About content with portrait image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16 xl:gap-20">
            {/* Text content */}
            <div className="flex-1 lg:max-w-4xl">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-neutral-800 leading-tight font-serif">
                Hi! We're Izzie and Zia, a couple from the UK who love exploring
                and changing our work setting. We both work remotely as mobile
                and web app developers. I love writing and want to use this blog
                as a chance to share our experiences working remotely. I'm also
                a keen photographer and take all of the pictures for the blog.
                Our goal is simple — to share honest stories and real travel
                tips, without the fake gloss you find all too often online.
              </p>
            </div>

            {/* Portrait image - stacked on mobile, separate on desktop */}
            <div className="relative w-full sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] lg:flex-shrink-0 aspect-[3/4] lg:aspect-[3/4]">
              <Image
                src="/images/algarve_sunset_zia_portrait.JPG"
                alt="Portrait"
                fill
                className="object-cover rounded-2xl"
                sizes="(min-width: 1280px) 28rem, (min-width: 1024px) 24rem, (min-width: 768px) 20rem, (min-width: 640px) 16rem, 100vw"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

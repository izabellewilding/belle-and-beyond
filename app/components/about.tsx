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
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-800 mb-6"
              >
                Our Ecotourism Story
              </motion.h2>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-neutral-800 leading-tight font-serif">
                Hi! We're Izzie and Zia, a couple from the UK who love exploring
                and changing our work setting. We both work remotely as mobile
                and web app developers. I love writing and want to use this blog
                as a chance to share our experiences working remotely. I'm also
                a keen photographer and take all of the pictures for the blog.
                Our goal is simple — to share honest stories and real travel
                tips, without the fake gloss you find all too often online.
              </p>
              {/* <p className="mt-6 text-base sm:text-lg text-neutral-700 leading-relaxed">
                Every trip becomes a practical ecotourism guide—highlighting the
                responsible tour operators we trust, the mindful travel tips we
                practice, and the low-impact stays that keep communities at the
                center. We document sustainable travel photography, remote-work
                rituals, and hands-on insights so you can plan greener
                adventures without sacrificing spontaneity.
              </p> */}
              {/* <ul className="mt-6 space-y-2 text-neutral-700 text-sm sm:text-base">
                <li>
                  • Eco travel tips for slow itineraries and mindful exploration
                </li>
                <li>
                  • In-depth sustainable travel guides featuring everything from
                  kitchen table planning to on-the-ground conservation partners
                </li>
                <li>
                  • Advice on blending remote work with conservation-focused
                  adventures
                </li>
              </ul> */}
            </div>

            {/* Portrait image - stacked on mobile, separate on desktop */}
            <div className="relative w-full sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] lg:flex-shrink-0 aspect-[3/4] lg:aspect-[3/4]">
              <Image
                src="/images/algarve_sunset_zia_portrait.JPG"
                alt="Izzie and Zia documenting sustainable ecotourism adventures at sunset in Portugal"
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

"use client";

// components/Footer.tsx
import { Icons } from "./icons";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="relative text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/sunset-puerto-viejo.png"
          alt="Footer background"
          fill
          className="object-cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Main Footer Content */}
      <div className="relative pt-20 pb-8 px-4 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          {/* Top Section - Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Link href="/" className="inline-block mb-6">
              <div className="relative w-[250px] h-[60px] mx-auto">
                <Image
                  src="/logo-white.png"
                  alt="Belle and Beyond Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-lg text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              Sharing stories and snapshots from around the world. Travel
              through the lens with me.
            </p>
          </motion.div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Explore */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center md:text-left"
            >
              <h3 className="text-xl font-serif mb-6 text-white">Explore</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/blog"
                    className="text-white/80 hover:text-white transition-colors duration-300 text-base"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/destinations"
                    className="text-white/80 hover:text-white transition-colors duration-300 text-base"
                  >
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tips"
                    className="text-white/80 hover:text-white transition-colors duration-300 text-base"
                  >
                    Travel Tips
                  </Link>
                </li>
                <li>
                  <Link
                    href="/photography"
                    className="text-white/80 hover:text-white transition-colors duration-300 text-base"
                  >
                    Photography
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center md:text-left"
            >
              <h3 className="text-xl font-serif mb-6 text-white">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-white/80 hover:text-white transition-colors duration-300 text-base"
                  >
                    About Me
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-white/80 hover:text-white transition-colors duration-300 text-base"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gear"
                    className="text-white/80 hover:text-white transition-colors duration-300 text-base"
                  >
                    My Gear
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center md:text-left"
            >
              <h3 className="text-xl font-serif mb-6 text-white">Follow Me</h3>
              <div className="flex justify-center md:justify-start">
                <Icons />
              </div>
              <p className="text-white/70 text-sm mt-4 leading-relaxed">
                Join me on my adventures and discover new destinations together.
              </p>
            </motion.div>
          </div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12 text-center border border-white/20"
          >
            <h3 className="text-2xl font-serif mb-4 text-white">
              Stay Connected
            </h3>
            <p className="text-white/80 mb-6 max-w-md mx-auto">
              Get travel inspiration and photography tips delivered to your
              inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white/50 transition-colors"
              />
              <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-white/90 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="border-t border-white/20 pt-8 text-center"
          >
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Belle & Beyond. All rights reserved.
              Made with ❤️ for fellow travelers.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

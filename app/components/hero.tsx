"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaPinterest, FaFacebook, FaLink } from "react-icons/fa";

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

      {/* Gradient overlay from bottom to top */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />

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

      {/* Navigation in top right */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-6 md:gap-8"
        >
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-white">
            <Link
              href="/destinations"
              className="text-sm md:text-base font-sans hover:opacity-80 transition-opacity"
            >
              Destinations
            </Link>
            <Link
              href="/blog"
              className="text-sm md:text-base font-sans hover:opacity-80 transition-opacity"
            >
              Blog
            </Link>
            <Link
              href="#"
              className="text-sm md:text-base font-sans hover:opacity-80 transition-opacity"
            >
              Responsible Travel
            </Link>
            <Link
              href="#"
              className="text-sm md:text-base font-sans hover:opacity-80 transition-opacity"
            >
              Shop
            </Link>
            <Link
              href="#our-story"
              className="text-sm md:text-base font-sans hover:opacity-80 transition-opacity"
            >
              About
            </Link>
            <Link
              href="/"
              className="text-sm md:text-base font-sans hover:opacity-80 transition-opacity underline underline-offset-4"
            >
              Home
            </Link>
          </nav>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4 text-white">
            <a
              href="https://www.instagram.com/izzia_travel"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="Pinterest"
            >
              <FaPinterest size={20} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="Facebook"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="Share"
            >
              <FaLink size={20} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Centered Hero Text */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="text-center px-6 md:px-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-extrabold text-[#F2E9F1] mb-4 md:mb-6 leading-tight">
            Work Anywhere,
            <br />
            Belong Everywhere
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-[#F2E9F1] font-sans">
            Your Guide to Places, Practical Tips, and Worldly Events
          </p>
        </motion.div>
      </div>
    </section>
  );
};

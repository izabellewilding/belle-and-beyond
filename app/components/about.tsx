"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import {
  FaInstagram,
  FaGithub,
  FaEnvelope,
  FaCamera,
  FaCode,
  FaGlobeAmericas,
} from "react-icons/fa";

export const About = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  const socialLinks = [
    {
      icon: <FaInstagram size={24} />,
      href: "https://www.instagram.com/belleandbeyond.travel?igsh=MTVxZ3NtaGw3N2M2NA%3D%3D&utm_source=qr",
      label: "Instagram",
      color: "hover:text-pink-500",
    },
    {
      icon: <FaGithub size={24} />,
      href: "https://github.com/izabellewilding",
      label: "GitHub",
      color: "hover:text-gray-700",
    },
    {
      icon: <FaEnvelope size={24} />,
      href: "mailto:izabellewilding@gmail.com",
      label: "Email",
      color: "hover:text-green-500",
    },
  ];

  const passions = [
    {
      icon: <FaCamera size={32} />,
      title: "Photography",
      description:
        "Capturing the quiet beauty of nature and unexpected moments",
    },
    {
      icon: <FaCode size={32} />,
      title: "Web Development",
      description: "Creating beautiful and functional digital experiences",
    },
    {
      icon: <FaGlobeAmericas size={32} />,
      title: "Travel",
      description: "Exploring rustic places and sharing authentic stories",
    },
  ];

  return (
    <section className="relative min-h-screen w-full text-neutral-800 overflow-hidden py-24">
      {/* Background with Parallax */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      >
        <Image
          src="/about.jpg"
          alt="Nature background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Profile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/selfie.jpg"
                alt="Izabelle Wilding"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Right Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-lg rounded-lg p-8 shadow-xl"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-4xl font-serif mb-6"
            >
              About Me
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-4 text-gray-700"
            >
              <p className="text-lg">
                Hey! I'm Izabelle Wilding — a photographer, web developer, and
                traveller. Originally from the UK, I'm currently based in
                Tbilisi, Georgia.
              </p>
              <p className="text-lg">
                I'm drawn to the quiet beauty of nature, unexpected moments, and
                the raw, soulful charm of old, rustic places.
              </p>
              <p className="text-lg">
                Through honest travel guides and vivid imagery, I hope to
                inspire you to explore new destinations and see the world (and
                yourself) a little differently.
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8"
            >
              <div className="flex space-x-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transform transition-all duration-300 ${link.color} hover:scale-110`}
                  >
                    {link.icon}
                    <span className="sr-only">{link.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Passions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {passions.map((passion, index) => (
            <motion.div
              key={passion.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.2 }}
              className="bg-white/80 backdrop-blur-lg rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-gray-700 mb-4">{passion.icon}</div>
              <h3 className="text-xl font-serif mb-2">{passion.title}</h3>
              <p className="text-gray-600">{passion.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

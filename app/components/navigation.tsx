"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  FaInstagram,
  FaPinterest,
  FaFacebook,
  FaLink,
  FaTimes,
} from "react-icons/fa";
import { RectangularButton } from "./rectangular-button";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Ensure component is mounted before rendering portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect and active section detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section based on scroll position
      const sections = ["news", "our-story", "contact", "social"];
      const scrollPosition = window.scrollY + 200; // Increased offset for better detection

      let currentSection = "";

      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = sections[i];
            break;
          }
        }
      }

      // If no section is found, check if we're at the top
      if (!currentSection && window.scrollY < 100) {
        currentSection = "";
      } else if (!currentSection) {
        // If we're past all sections, use the last one
        currentSection = sections[sections.length - 1];
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle hash navigation after route change
  useEffect(() => {
    if (pathname === "/" && window.location.hash) {
      const hash = window.location.hash.slice(1);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setActiveSection(hash);
        }
      }, 100);
    }
  }, [pathname]);

  const navLinks = [
    { href: "/destinations", label: "Destinations", isPage: true },
    { href: "/blog", label: "Blog", isPage: true },
    { href: "#our-story", label: "About" },
    { href: "/", label: "Home", isPage: true },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // If it's a hash link and we're not on the homepage, navigate to homepage first
    if (href.startsWith("#") && pathname !== "/") {
      e.preventDefault();
      router.push(`/${href}`);
    } else if (href.startsWith("#")) {
      // If we're already on homepage, prevent default and scroll manually
      e.preventDefault();
      const sectionId = href.slice(1);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveSection(sectionId);
      }
    }
  };

  const handleLogoClick = () => {
    setActiveSection(""); // Clear active section when going to top
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="w-full px-3 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand */}
          <Link href="/" className="relative z-50" onClick={handleLogoClick}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className={`relative transition-all duration-300 ${
                isScrolled ? "brightness-0" : "brightness-0 invert"
              }`}
            >
              <Image
                src="/logo.svg"
                alt="The Portable Life"
                width={240}
                height={75}
                className="h-16 md:h-16 lg:h-20 w-auto"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation Links and Social Icons */}
          <div className="hidden md:flex items-center gap-6 md:gap-8">
            {/* Navigation Links */}
            <nav className="flex items-center gap-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      if (!link.isPage) {
                        handleNavClick(e, link.href);
                      }
                    }}
                    className={`inline-flex items-center text-sm md:text-base font-sans transition-opacity leading-[1.2] ${
                      (link.isPage && pathname === link.href) ||
                      (!link.isPage &&
                        pathname === "/" &&
                        activeSection === link.href.slice(1))
                        ? isScrolled
                          ? "text-neutral-900 underline underline-offset-4"
                          : "text-white underline underline-offset-4"
                        : isScrolled
                          ? "text-neutral-800 hover:opacity-80"
                          : "text-white hover:opacity-80"
                    }`}
                  >
                    <span className="inline-block translate-y-[2px]">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Social Media Icons */}
            <div
              className={`flex items-center gap-4 ${isScrolled ? "text-neutral-800" : "text-white"}`}
            >
              <a
                href="https://www.instagram.com/theportablelife_"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://pin.it/1SxbfE8C8"
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
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden relative z-50 p-2 transition-colors ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>

          {/* Mobile Menu - rendered via portal to avoid z-index issues */}
          {mounted &&
            createPortal(
              <AnimatePresence>
                {isOpen && (
                  <>
                    {/* Backdrop */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998] md:hidden"
                      onClick={() => setIsOpen(false)}
                    />
                    {/* Menu Panel */}
                    <motion.div
                      initial={{ x: "100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "100%" }}
                      transition={{
                        type: "tween",
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-[9999] md:hidden overflow-y-auto"
                    >
                      <div className="flex flex-col h-full">
                        {/* Header with Logo and Close Button */}
                        <div className="flex items-center justify-between px-6 py-6 border-b border-neutral-200">
                          <Link href="/" onClick={() => setIsOpen(false)}>
                            <div className="brightness-0">
                              <Image
                                src="/logo.svg"
                                alt="The Portable Life"
                                width={180}
                                height={56}
                                className="h-12 w-auto"
                                priority
                              />
                            </div>
                          </Link>
                          <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 text-neutral-800 hover:bg-neutral-100 rounded-full transition-colors"
                            aria-label="Close menu"
                          >
                            <FaTimes size={24} />
                          </button>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex-1 px-6 py-8">
                          <div className="space-y-2">
                            {navLinks.map((link, index) => (
                              <motion.div
                                key={link.href}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: index * 0.05,
                                  duration: 0.3,
                                }}
                              >
                                <Link
                                  href={link.href}
                                  className={`block py-4 px-4 text-lg font-sans transition-all duration-200 rounded-lg ${
                                    (link.isPage && pathname === link.href) ||
                                    (!link.isPage &&
                                      pathname === "/" &&
                                      activeSection === link.href.slice(1))
                                      ? "bg-neutral-100 text-neutral-900 font-medium"
                                      : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                                  }`}
                                  onClick={(e) => {
                                    if (!link.isPage) {
                                      handleNavClick(e, link.href);
                                    }
                                    setIsOpen(false);
                                  }}
                                >
                                  {link.label}
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </nav>

                        {/* Get In Touch Button */}
                        <div className="px-6 py-6 border-t border-neutral-200">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.3 }}
                          >
                            <RectangularButton
                              href="mailto:theportablelife@proton.me"
                              text="Get In Touch"
                              className="w-full"
                              onClick={() => setIsOpen(false)}
                            />
                          </motion.div>
                        </div>

                        {/* Social Media Icons */}
                        <div className="px-6 py-6 border-t border-neutral-200">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.3 }}
                            className="flex items-center justify-center gap-6"
                          >
                            <a
                              href="https://www.instagram.com/theportablelife_"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-neutral-700 hover:text-neutral-900 transition-colors"
                              aria-label="Instagram"
                              onClick={() => setIsOpen(false)}
                            >
                              <FaInstagram size={22} />
                            </a>
                            <a
                              href="https://pin.it/1SxbfE8C8"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-neutral-700 hover:text-neutral-900 transition-colors"
                              aria-label="Pinterest"
                              onClick={() => setIsOpen(false)}
                            >
                              <FaPinterest size={22} />
                            </a>
                            <a
                              href="#"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-neutral-700 hover:text-neutral-900 transition-colors"
                              aria-label="Facebook"
                              onClick={() => setIsOpen(false)}
                            >
                              <FaFacebook size={22} />
                            </a>
                            <a
                              href="#"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-neutral-700 hover:text-neutral-900 transition-colors"
                              aria-label="Share"
                              onClick={() => setIsOpen(false)}
                            >
                              <FaLink size={22} />
                            </a>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>,
              document.body
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

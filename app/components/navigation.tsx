"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  // Handle scroll effect and active section detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section based on scroll position
      const sections = ["news", "our-story", "gallery", "contact", "social"];
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
    { href: "#news", label: "News" },
    { href: "/destinations", label: "Destinations", isPage: true },
    { href: "/tips", label: "Tips", isPage: true },
    { href: "#gallery", label: "Gallery" },
    { href: "#our-story", label: "Our Story" },
    { href: "#social", label: "Social" },
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
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-white"}`}
    >
      <div className="w-full px-3 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 pt-1 md:pt-2">
          {/* Brand */}
          <Link href="/" className="relative z-50" onClick={handleLogoClick}>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <Image
                src="/logo.svg"
                alt="Izzia Travel"
                width={120}
                height={38}
                className="h-10 md:h-12 w-auto"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation Links (separate from button) */}
          <div className="hidden md:flex items-center gap-8 ml-8 mr-auto">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={(e) => {
                    if (!link.isPage) {
                      handleNavClick(e, link.href);
                    }
                  }}
                  className={`transition-all duration-200 py-2 px-4 rounded-full ${
                    (link.isPage && pathname === link.href) ||
                    (!link.isPage &&
                      pathname === "/" &&
                      activeSection === link.href.slice(1))
                      ? "bg-neutral-200 text-neutral-900"
                      : "text-neutral-800 hover:text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop CTA Button on far right */}
          <div className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="#contact"
                className="inline-flex items-center rounded-full bg-neutral-900 text-white px-12 py-3 text-base  hover:bg-neutral-800 transition-colors"
              >
                Get In Touch
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-50 p-2 text-gray-800"
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

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed inset-0 bg-white z-40 md:hidden"
              >
                <div className="flex flex-col items-center justify-center h-full space-y-8 text-2xl">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className={`transition-all duration-200 py-2 px-4 rounded-full ${
                          (link.isPage && pathname === link.href) ||
                          (!link.isPage &&
                            pathname === "/" &&
                            activeSection === link.href.slice(1))
                            ? "bg-neutral-200 text-neutral-900"
                            : "text-gray-800 hover:text-gray-600 hover:bg-neutral-100"
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
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-4"
                  >
                    <Link
                      href="#contact"
                      className="inline-flex items-center rounded-full bg-neutral-900 text-white px-8 py-4 text-base"
                      onClick={() => setIsOpen(false)}
                    >
                      Get In Touch
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

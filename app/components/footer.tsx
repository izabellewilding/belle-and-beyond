"use client";

import Link from "next/link";
import { FaInstagram, FaPinterest, FaFacebook } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer id="social" className="bg-white w-full">
      <div className="container-content">
        <div className="py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {/* Navigation Links */}
            <div>
              <h3 className="text-lg md:text-xl font-playfair font-bold text-darkText mb-6">
                Navigation
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-darkText font-sans hover:opacity-70 transition-opacity"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-darkText font-sans hover:opacity-70 transition-opacity"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/destinations"
                    className="text-darkText font-sans hover:opacity-70 transition-opacity"
                  >
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link
                    href="#our-story"
                    className="text-darkText font-sans hover:opacity-70 transition-opacity"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:izabellewilding@gmail.com"
                    className="text-darkText font-sans hover:opacity-70 transition-opacity"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg md:text-xl font-playfair font-bold text-darkText mb-6">
                Follow The Portable Life
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://www.instagram.com/theportablelife_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-darkText font-sans hover:opacity-70 transition-opacity flex items-center gap-2"
                  >
                    <FaInstagram size={18} />
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-darkText font-sans hover:opacity-70 transition-opacity flex items-center gap-2"
                  >
                    <FaPinterest size={18} />
                    Pinterest
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-darkText font-sans hover:opacity-70 transition-opacity flex items-center gap-2"
                  >
                    <FaFacebook size={18} />
                    Facebook
                  </a>
                </li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h3 className="text-lg md:text-xl font-playfair font-bold text-darkText mb-6">
                About
              </h3>
              <p className="text-darkText font-sans leading-relaxed mb-6">
                I'm Izabelle, a digital nomad from the UK sharing honest travel
                reviews, guides, and experiences from our life on the road.
              </p>
              <a
                href="mailto:izabellewilding@gmail.com"
                className="text-darkText font-sans hover:opacity-70 transition-opacity"
              >
                izabellewilding@gmail.com
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 md:mt-16 pt-8 border-t border-neutral-200">
            <p className="text-sm text-darkText/70 font-sans text-center">
              © {new Date().getFullYear()} The Portable Life. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

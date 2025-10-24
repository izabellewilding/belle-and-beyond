"use client";

// Redesigned Footer with social gallery and embedded footer items
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer id="social" className="bg-[#2c2526] text-white">
      <div className="px-4 md:px-10 lg:px-14 pt-14 md:pt-20 pb-10">
        {/* Heading */}
        <h2 className="font-serif text-4xl md:text-6xl mb-8 md:mb-10">
          Follow Us On Social
        </h2>

        {/* Social gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-14 md:mb-20">
          {[
            "/images/car.JPG",
            "/images/lisbon-shopfront.JPG",
            "/images/mirror.JPG",
          ].map((src, idx) => (
            <div
              key={idx}
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden"
            >
              <Image
                src={src}
                alt="Social post"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
            </div>
          ))}
        </div>

        {/* Footer items inside the same dark section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16">
          {/* About */}
          <div>
            <h3 className="font-serif text-2xl md:text-3xl mb-4">About Us</h3>
            <p className="text-white/85 leading-relaxed">
              123 Demo Street
              <br />
              New York, NY 12345
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-2xl md:text-3xl mb-4">Contact Us</h3>
            <p className="text-white/85 leading-relaxed">
              email@example.com
              <br />
              (555) 555-5555
            </p>
          </div>

          {/* Follow */}
          <div>
            <h3 className="font-serif text-2xl md:text-3xl mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="underline underline-offset-4">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="underline underline-offset-4">
                  X (Formerly Twitter)
                </Link>
              </li>
              <li>
                <Link href="#" className="underline underline-offset-4">
                  Pinterest
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-2xl md:text-3xl mb-4">Newsletter</h3>
            <p className="text-white/85 mb-4">
              Sign up to receive photography tips, studio updates, and exclusive
              offers delivered straight to your inbox.
            </p>
            <div className="flex items-stretch gap-3">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 rounded-md px-4 py-3 text-neutral-900"
              />
              <button className="rounded-full bg-[#cfcfc9] text-neutral-900 px-5 py-3">
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 md:mt-16 border-t border-white/20 pt-6 text-sm text-white/70">
          © {new Date().getFullYear()} Belle & Beyond. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

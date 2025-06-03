// components/Footer.tsx
import { Icons } from "./icons";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-[#2b281b] text-white pt-12 pb-6 px-4 md:px-12">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          {/* Logo */}
          <Link href="/" className="">
            <div className="relative w-[175px] h-[40px]">
              <Image
                src="/logo-white.png"
                alt="Belle and Beyond Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>{" "}
          <p className="text-sm text-gray-400">
            Sharing stories and snapshots from around the world. Travel through
            the lens with me.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Explore</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/destinations" className="hover:text-white">
                Destinations
              </Link>
            </li>
            <li>
              <Link href="/tips" className="hover:text-white">
                Travel Tips
              </Link>
            </li>
            <li>
              <Link href="/photography" className="hover:text-white">
                Photography
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="/about" className="hover:text-white">
                About Me
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </li>
            <li>
              <a href="/gear" className="hover:text-white">
                My Gear
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Me</h3>
          <Icons />
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Belle&Beyond. All rights reserved.
      </div>
    </footer>
  );
};

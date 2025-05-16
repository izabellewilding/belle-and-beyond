import Link from "next/link";
import Image from "next/image";
import { Button } from "./button";

export const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-[175px] h-[40px]">
              <Image
                src="/logo.svg"
                alt="Belle and Beyond Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Navigation Links - Hidden on Mobile */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/destinations"
              className="text-navy hover:text-tan transition-colors"
            >
              Destinations
            </Link>
            <Link
              href="/guides"
              className="text-navy hover:text-tan transition-colors"
            >
              Guides
            </Link>
            <Link
              href="/photography"
              className="text-navy hover:text-tan transition-colors"
            >
              Photography
            </Link>
            <Link
              href="/about"
              className="text-navy hover:text-tan transition-colors"
            >
              About
            </Link>
          </div>

          {/* Button */}
          <Button text="Contact" href="/contact" className="hidden md:block" />

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-navy" aria-label="Toggle menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

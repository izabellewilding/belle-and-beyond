// components/Footer.tsx
import { FaInstagram, FaTwitter, FaGithub, FaEnvelope } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold mb-4">WanderLens</h2>
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
              <a href="/blog" className="hover:text-white">
                Blog
              </a>
            </li>
            <li>
              <a href="/destinations" className="hover:text-white">
                Destinations
              </a>
            </li>
            <li>
              <a href="/tips" className="hover:text-white">
                Travel Tips
              </a>
            </li>
            <li>
              <a href="/photography" className="hover:text-white">
                Photography
              </a>
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
          <div className="flex space-x-4">
            <a
              href="https://instagram.com"
              target="_blank"
              className="hover:text-pink-400"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="hover:text-blue-400"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              className="hover:text-gray-300"
            >
              <FaGithub size={20} />
            </a>
            <a href="mailto:hello@example.com" className="hover:text-green-400">
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} WanderLens. All rights reserved.
      </div>
    </footer>
  );
};

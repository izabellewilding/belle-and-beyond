import { FaInstagram, FaTwitter, FaGithub, FaEnvelope } from "react-icons/fa";

export const Icons = () => {
  return (
    <div>
      <div className="flex space-x-4">
        <a
          href="https://www.instagram.com/belleandbeyond.travel?igsh=MTVxZ3NtaGw3N2M2NA%3D%3D&utm_source=qr"
          target="_blank"
          className="hover:text-pink-400"
        >
          <FaInstagram size={20} />
        </a>
        {/* <a
          href="https://twitter.com"
          target="_blank"
          className="hover:text-blue-400"
        >
          <FaTwitter size={20} />
        </a> */}
        <a
          href="https://github.com/izabellewilding"
          target="_blank"
          className="hover:text-gray-300"
        >
          <FaGithub size={20} />
        </a>
        <a
          href="mailto:izabellewilding@gmail.com"
          className="hover:text-green-400"
        >
          <FaEnvelope size={20} />
        </a>
      </div>
    </div>
  );
};

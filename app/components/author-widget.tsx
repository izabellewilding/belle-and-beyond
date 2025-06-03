// import Link from "next/link";
import Image from "next/image";
import Link from "next/link";

export const AuthorWidget = () => {
  return (
    <div className="bg-white text-center shadow-md rounded-lg p-6 flex flex-col items-center space-y-6">
      <Link href="/" className="">
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
      {/* Round Image */}
      <div className="relative w-42 h-42">
        <Image
          src="/images/selfie.jpg" // Replace with your image path or URL
          alt="Author Face"
          width={168}
          height={168}
          className="rounded-full object-cover border-2 border-gray-300"
        />
      </div>

      {/* Bullet Point Description */}
      <div className="text-gray-700 space-y-2 text-md">
        {/* <h3 className="text-gray-300 text-sm pb-2">ABOUT ME</h3> */}
        Hi, I'm Izabelle! A passionate travel writer with a love for
        photography, art and culture. I work as a Fontend Developer and
        currently live in Tbilisi, Georgia. I have a degree in Linguistics from
        University College London and spent most of my childhood living in rural
        Wales.
      </div>
    </div>
  );
};

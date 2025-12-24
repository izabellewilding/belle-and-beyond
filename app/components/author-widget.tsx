// import Link from "next/link";
import Image from "next/image";
import Link from "next/link";

export const AuthorWidget = () => {
  return (
    <div className="bg-white text-center shadow-md rounded-lg p-6 flex flex-col items-center space-y-6">
      <Link href="/#our-story" className="">
        <div className="relative w-[240px] h-[75px]">
          <Image
            src="/logo.svg"
            alt="The Portable Life Logo"
            fill
            priority
            className="object-contain brightness-0"
          />
        </div>
      </Link>
      {/* Round Image */}
      <div className="relative w-[168px] h-[168px] rounded-full overflow-hidden">
        <Image
          src="/images/jungle_izzie.jpeg"
          alt="Izzie, digital nomad and travel blogger"
          width={168}
          height={168}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Author Description */}
      <div className="text-gray-700 space-y-2 text-md">
        {/* <h3 className="text-gray-300 text-sm pb-2">ABOUT ME</h3> */}
        <p className="text-md leading-relaxed max-w-[300px]">
          Hello! Welcome to The Portable Life. I'm Izzie, a software
          engineer-turned-digital-nomad sharing honest travel guides and remote
          work adventures.
        </p>
      </div>
    </div>
  );
};

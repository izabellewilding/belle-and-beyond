// import Link from "next/link";
import Image from "next/image";
import Link from "next/link";

export const AuthorWidget = () => {
  return (
    <div className="bg-white text-center shadow-md rounded-lg p-6 flex flex-col items-center space-y-6">
      <Link href="/" className="">
        <div className="relative w-[200px] h-[50px]">
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
      <div className="relative w-[168px] h-[168px] rounded-full overflow-hidden">
        <Image
          src="/images/izzy_zia.jpg"
          alt="Author Face"
          width={168}
          height={168}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Bullet Point Description */}
      <div className="text-gray-700 space-y-2 text-md">
        {/* <h3 className="text-gray-300 text-sm pb-2">ABOUT ME</h3> */}
        Hi! We're Izzie and Zia, a couple from the UK who love exploring and
        changing our work setting. We both work remotely as mobile and web app
        developers. I'm love writing and want to use this blog as a chance to
        share our experiences working remotely. I'm also a keen photographer and
        take all of the pictures for the blog. Our goal is simple — to share
        honest stories and real travel tips, without the fake gloss you find all
        too often online.
      </div>
    </div>
  );
};

// import Link from "next/link";
import Image from "next/image";
import Link from "next/link";

export const AuthorWidget = () => {
  return (
    <div className="bg-white text-center shadow-md rounded-lg p-6 flex flex-col items-center space-y-6">
      <Link href="/" className="">
        <div className="relative w-[160px] h-[40px]">
          <Image
            src="/logo.svg"
            alt="Izzia Travel Logo"
            fill
            priority
            className="object-contain"
          />
        </div>
      </Link>
      {/* Round Image */}
      {/* <div className="relative w-[168px] h-[168px] rounded-full overflow-hidden">
        <Image
          src="/images/izzy_zia.jpg"
          alt="Author Face"
          width={168}
          height={168}
          className="object-cover w-full h-full"
        />
      </div>

      Bullet Point Description
      <div className="text-gray-700 space-y-2 text-md">
        <h3 className="text-gray-300 text-sm pb-2">ABOUT ME</h3>
        We are Izzia. 
      </div> */}
    </div>
  );
};

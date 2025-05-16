import Image from "next/image";
import { Button } from "./button";

export const Hero = () => {
  return (
    <section className="">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image Section */}
        <div className="relative h-[60vh] lg:h-[85vh]">
          <Image
            src="/images/sunset-puerto-viejo.png"
            alt="Scenic sunset view in Georgia with mountains and water - Travel blog photography from Tbilisi"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Section */}
        <div className="bg-cream p-8 lg:p-12 flex items-center justify-center">
          <div className="max-w-xl w-full bg-white py-24 px-12 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-8 font-serif">
              Elevate your travel with inspirational guides & smart tips
            </h1>
            <p className="text-md mb-8">
              I&apos;m Izabelle Wilding, a photographer, web developer and
              traveller based in Tbilisi, Georgia. I explore the world with
              curiosity and intention—and share practical advice, detailed
              guides, and curated recommendations to help you plan
              unforgettable, stress-free trips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button text="Travel Blog" href="/blog" />
              <Button text="Travel Blog" href="/blog" outline />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

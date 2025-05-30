import Image from "next/image";

export const ProfileCard = () => {
  return (
    <div className="flex items-center bg-white rounded-lg shadow-md p-4 max-w-md">
      {/* Round image on the left */}
      <div className="w-20 h-20 rounded-full overflow-hidden mr-4 relative">
        <Image
          src="/images/selfie.jpg" // Replace with your image path or URL
          alt="Your photo"
         fill
          objectFit="cover"
          priority={true}
        />
      </div>

      {/* Title and description on the right */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Your Title Here</h2>
        <p className="text-gray-600 mt-1">
          This is a brief description that goes alongside the title, giving more
          context or info.
        </p>
      </div>
    </div>
  );
};

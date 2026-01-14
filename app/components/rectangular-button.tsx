import Link from "next/link";

interface RectangularButtonProps {
  text: string;
  href: string;
  icon?: boolean;
  variant?: "dark" | "pink" | "white" | "offwhite" | "gold";
  className?: string;
  onClick?: () => void;
}

export const RectangularButton = ({
  text,
  href,
  icon = true,
  variant = "dark",
  className = "",
  onClick,
}: RectangularButtonProps) => {
  const variantStyles = {
    dark: "bg-neutral-900 text-white hover:bg-neutral-800",
    pink: "bg-[#E8B4D9] text-[#2a1f1f] hover:bg-[#DF9FCF] shadow-lg hover:shadow-xl",
    white:
      "bg-white text-neutral-900 hover:bg-gray-50 shadow-lg hover:shadow-xl",
    offwhite:
      "bg-[#faf7fa] text-neutral-900 hover:bg-[#f5f0f4] shadow-lg hover:shadow-xl",
    gold: "text-[#5c3d2e] shadow-lg hover:shadow-xl hover:scale-[1.02]",
  };

  const isGold = variant === "gold";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 md:px-8 text-base md:text-lg font-normal transition-all duration-300 ${variantStyles[variant]} ${className}`}
      style={{
        paddingTop: "18px",
        paddingBottom: "12px",
        ...(isGold && {
          background:
            "linear-gradient(135deg, #c9956c 0%, #f0d4b8 20%, #e6c29f 40%, #d4aa80 50%, #f5dfc5 70%, #c9956c 100%)",
          backgroundSize: "200% 200%",
          animation: "shimmer 3s ease-in-out infinite",
        }),
      }}
    >
      <span className="tracking-wide">{text}</span>
      {icon && (
        <svg
          className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 -translate-y-[2.5px]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      )}
    </Link>
  );
};

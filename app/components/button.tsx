import Link from "next/link";
import clsx from "clsx";

interface ButtonProps {
  text?: string;
  href: string;
  outline?: boolean;
  white?: boolean;
  className?: string;
}

export const Button = ({
  text = "Click Me",
  href,
  outline = false,
  white = false,
  className = "",
}: ButtonProps) => {
  const baseStyles =
    "relative inline-block text-center fit-content whitespace-nowrap px-12 py-3 text-md font-large transition-colors duration-200 overflow-hidden group rounded-full";

  const filledStyle = "bg-purple text-white hover:bg-[##8e58c1]";
  const outlineStyle =
    "border border-purple text-purple hover:bg-purple hover:text-white bg-transparent";

  const whiteOutlineStyle =
    "border border-white text-white hover:bg-white hover:text-black";

  const buttonClass = clsx(
    baseStyles,
    white ? whiteOutlineStyle : outline ? outlineStyle : filledStyle,
    className
  );

  return (
    <Link href={href} className={buttonClass}>
      <span className="relative z-10">{text}</span>

      {/* Shimmer layer */}
      <div className="absolute inset-0 flex justify-center transform skew-x-[-12deg] -translate-x-full transition-transform duration-700 group-hover:translate-x-full">
        <div className="h-full w-8 bg-white/20" />
      </div>
    </Link>
  );
};

import Link from "next/link";
import clsx from "clsx";

interface ButtonProps {
  text?: string;
  href: string;
  outline?: boolean;
  className?: string;
}

export const Button = ({
  text = "Click Me",
  href,
  outline = false,
  className = "",
}: ButtonProps) => {
  const baseStyles =
    "relative inline-block px-8 py-2 text-md font-medium rounded-sm transition-colors duration-200 overflow-hidden group";
  const filledStyle = "bg-navy text-white hover:bg-navy";
  const outlineStyle =
    "border border-tan text-tan hover:text-white bg-transparent hover:bg-tan hover:text-black";

  const buttonClass = clsx(
    baseStyles,
    outline ? outlineStyle : filledStyle,
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

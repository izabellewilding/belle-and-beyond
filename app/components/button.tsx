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
    "relative inline-block text-center px-10 py-4 rounded-full text-lg font-medium transition-colors duration-200 overflow-hidden group";
  const filledStyle = "bg-navy text-white hover:bg-[#282d60]";
  const outlineStyle =
    "border border-slate-400 text-slate-500 hover:text-slate-600 bg-transparent hover:border-slate-600";

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

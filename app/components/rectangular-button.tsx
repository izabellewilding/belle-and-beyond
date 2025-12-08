import Link from "next/link";
import clsx from "clsx";

interface RectangularButtonProps {
  text?: string;
  href: string;
  outline?: boolean;
  white?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const RectangularButton = ({
  text = "Click Me",
  href,
  outline = false,
  white = false,
  className = "",
  onClick,
  disabled = false,
}: RectangularButtonProps) => {
  // Base styles with explicit height and line-height control
  // Using sans-serif with adjustments for proper vertical alignment
  const baseStyles = clsx(
    "inline-flex items-center justify-center",
    "text-center whitespace-nowrap",
    "px-6 sm:px-8",
    "h-[48px]",
    "text-base md:text-lg",
    "font-sans",
    "rounded-none",
    "transition-all duration-200 ease-in-out",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    disabled && "opacity-50 cursor-not-allowed pointer-events-none"
  );

  // Filled style (default)
  const filledStyle = clsx(
    "bg-[#463e43] text-white",
    "hover:bg-[#3a3338]",
    "focus:ring-[#463e43]/50"
  );

  // Outline style
  const outlineStyle = clsx(
    "border-2 border-[#EAC4C5] text-[#423636] bg-transparent",
    "hover:bg-[#EAC4C5]/10",
    "focus:ring-[#EAC4C5]/50"
  );

  // White outline style
  const whiteOutlineStyle = clsx(
    "border-2 border-white text-white bg-transparent",
    "hover:bg-white/10",
    "focus:ring-white/50"
  );

  const buttonClass = clsx(
    baseStyles,
    white ? whiteOutlineStyle : outline ? outlineStyle : filledStyle,
    className
  );

  // Text wrapper with proper vertical alignment
  // Adjusting for sans-serif baseline with transform - increased offset
  const textWrapperClass = "inline-block leading-[1.2] translate-y-[3px]";

  // Use regular anchor tag for external links (mailto, http, etc.)
  if (href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={buttonClass}
        onClick={onClick}
        aria-disabled={disabled}
      >
        <span className={textWrapperClass}>{text}</span>
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={buttonClass}
      onClick={onClick}
      aria-disabled={disabled}
    >
      <span className={textWrapperClass}>{text}</span>
    </Link>
  );
};

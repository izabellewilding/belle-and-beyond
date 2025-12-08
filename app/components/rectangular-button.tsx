import Link from "next/link";
import { Button } from "@material-tailwind/react";

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
  // Determine variant based on props
  const variant = outline || white ? "outlined" : "filled";
  
  // Determine color - Material Tailwind uses gray for dark buttons
  // We'll use a custom className to override with our specific colors
  const color = "gray";

  // Custom styles to match your design
  const customStyles = outline
    ? "border-2 border-[#EAC4C5] text-[#423636] bg-transparent hover:bg-[#EAC4C5]/10"
    : white
    ? "border-2 border-white text-white bg-transparent hover:bg-white/10"
    : "bg-[#423636] text-white hover:bg-[#352d2d]";

  // Use regular anchor tag for external links (mailto, http, etc.)
  if (href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <Button
        as="a"
        href={href}
        variant={variant}
        color={color}
        className={`rounded-none ${customStyles} ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </Button>
    );
  }

  return (
    <Button
      as={Link}
      href={href}
      variant={variant}
      color={color}
      className={`rounded-none ${customStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

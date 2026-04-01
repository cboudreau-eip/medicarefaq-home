import { useZipCodeModal } from "@/contexts/ZipCodeModalContext";
import type { ReactNode, MouseEvent } from "react";

interface ComparePlansLinkProps {
  children: ReactNode;
  className?: string;
}

/**
 * Drop-in replacement for <a href="/medicare-plans/compare"> links.
 * Opens the ZIP code modal instead of navigating to the compare page.
 */
export default function ComparePlansLink({ children, className }: ComparePlansLinkProps) {
  const { openZipModal } = useZipCodeModal();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    openZipModal();
  };

  return (
    <a
      href="/medicare-plans/compare"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}

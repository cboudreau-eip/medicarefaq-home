import { useZipCodeModal } from "@/contexts/ZipCodeModalContext";
import type { ReactNode, MouseEvent } from "react";

interface ComparePlansLinkProps {
  children: ReactNode;
  className?: string;
}

/**
 * Drop-in replacement for <a href="/compare-rates"> links.
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
      href="/compare-rates"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}

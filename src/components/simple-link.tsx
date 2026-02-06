"use client";

import Link from "next/link";
import { useState } from "react";

export interface SimpleLinkProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
  href: string;
}

export default function SimpleLink({ children, href, ...props }: SimpleLinkProps) {
  const isExternal = href.startsWith("http");

  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link
      href={href}
      {...props}
      prefetch={isHovering}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      draggable={false}
      aria-label={isExternal ? `Open ${href} in a new tab` : undefined}
    >
      {children}
    </Link>
  );
}

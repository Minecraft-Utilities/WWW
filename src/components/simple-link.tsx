"use client";

import Link from "next/link";
import { useState } from "react";

export interface SimpleLinkProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
  href: string;
}

export default function SimpleLink({ children, href, ...props }: SimpleLinkProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link
      href={href}
      {...props}
      prefetch={isHovering}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
    </Link>
  );
}

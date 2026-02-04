"use client";

import { cn } from "@/app/common/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";
import { BsPerson, BsPersonFillExclamation } from "react-icons/bs";
import SimpleLink from "../simple-link";
import { ServerIcon } from "lucide-react";

const links: ReactElement<any>[] = [
  <SimpleNavLink
    key="server"
    name="Server"
    href="/server"
    icon={<ServerIcon className="size-4" />}
  />,
  <SimpleNavLink
    key="player"
    name="Player"
    href="/player"
    icon={<BsPerson className="size-4" />}
  />,
];

export default function Navbar() {
  return (
    <nav
      className={cn(
        "border-border bg-background/55 sticky inset-x-0 top-0 z-50 flex h-12 w-full items-center justify-between border-b px-2 py-1 backdrop-blur-md select-none lg:justify-around lg:px-8",
      )}
    >
      {/* Left */}
      <div className="flex items-center gap-(--spacing-sm) md:gap-3">
        {/* Branding */}
        <SimpleLink
          className="flex items-center gap-(--spacing-sm) hover:opacity-80 md:gap-2"
          href="/"
          draggable={false}
        >
          <h1 className="text-primary hidden text-base font-bold md:flex md:text-lg">
            MC Utils
          </h1>
        </SimpleLink>

        {/* Links */}
        <div className="flex items-center gap-0.5 md:gap-1">
          {links.map((link) => link)}
        </div>
      </div>
      <div></div>
    </nav>
  );
}

function SimpleNavLink({
  name,
  icon,
  href,
  className,
}: {
  name: string;
  icon: ReactElement<any>;
  href: string;
  className?: string;
}) {
  const pathname = usePathname();
  const isActive =
    pathname &&
    (pathname === href || (href !== "/" && pathname.startsWith(href)));

  return (
    <SimpleLink
      className={cn(
        "group relative flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium transition-colors duration-150",
        isActive
          ? "bg-primary/10 text-primary border-primary/20 border"
          : "text-muted-foreground hover:text-primary hover:bg-primary/5",
        className,
      )}
      href={href}
      target={href.startsWith("/") ? "_self" : "_blank"}
      draggable={false}
    >
      {icon}
      <span className="hidden 2xl:flex">{name}</span>

      {/* Active indicator */}
      {isActive && (
        <div className="bg-primary absolute -bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full transition-opacity duration-200" />
      )}
    </SimpleLink>
  );
}

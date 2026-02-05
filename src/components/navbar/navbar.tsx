"use client";

import Image from "next/image";
import { ReactElement } from "react";
import SimpleLink from "../simple-link";
import QuerySearch from "../query-search";
import { usePathname } from "next/navigation";
import { cn } from "@/app/common/utils";
import { PlaneIcon } from "lucide-react";

const links: ReactElement<any>[] = [
  <NavLink
    key="capes"
    name="Capes"
    icon={<PlaneIcon className="size-5" />}
    href="/capes"
  />,
];

export default function Navbar() {
  const path = usePathname();

  return (
    <nav className="border-border bg-background/55 sticky inset-x-0 top-0 z-50 flex h-12 w-full items-center justify-between border-b px-2 py-1 backdrop-blur-md select-none lg:justify-around lg:px-8 ">
      <div className="w-5xl flex justify-between">
        <div className="flex items-center gap-(--spacing-md) md:gap-6">
          {/* Branding */}
          <SimpleLink
            className="flex items-center gap-(--spacing-sm) hover:opacity-80 md:gap-2.5"
            href="/"
            draggable={false}
          >
            <Image
              width={24}
              height={24}
              className="size-5 md:size-6"
              src="/logo.png"
              alt="MC Utils Logo"
            />

            <h1 className="text-primary hidden text-base font-bold md:flex md:text-lg">
              MC Utils
            </h1>
          </SimpleLink>

          {path !== "/" && <QuerySearch />}
        </div>

        {/* Links */}
        <div className="flex items-center gap-0.5 md:gap-1">
          {links.map((link) => link)}
        </div>
      </div>
    </nav>
  );
}

function NavLink({
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

"use client";

import { cn } from "@/app/common/utils";
import { ComputerDesktopIcon } from "@heroicons/react/16/solid";
import { FlameIcon } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";
import QuerySearch from "../lookup/query-search";
import SimpleLink from "../simple-link";

const links: ReactElement<any>[] = [
  <NavLink
    key="capes"
    name="Capes"
    icon={<FlameIcon className="size-5" />}
    href="/capes"
  />,
  <NavLink
    key="servers"
    name="Servers"
    icon={<ComputerDesktopIcon className="size-5" />}
    href="/servers"
  />,
];

export default function Navbar() {
  const path = usePathname();

  return (
    <nav className="border-border bg-background/55 sticky inset-x-0 top-0 z-50 flex h-12 w-full items-center justify-between border-b px-2 py-1 backdrop-blur-md select-none lg:justify-around lg:px-8">
      <div className="w-6xl flex justify-between">
        <div className="flex items-center gap-(--spacing-md) md:gap-6">
          {/* Branding */}
          <SimpleLink
            className="flex items-center gap-(--spacing-sm) hover:opacity-80 md:gap-2.5"
            href="/"
            draggable={false}
          >
            <Image
              width={28}
              height={28}
              className="size-7"
              src="/logo.png"
              alt="MC Utils Logo"
            />

            <h1 className="text-primary hidden text-base font-bold sm:flex sm:text-lg">
              MC Utils
            </h1>
          </SimpleLink>

          {/* Links */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            {links.map((link) => link)}
          </div>
        </div>

        {path !== "/" && <QuerySearch className={"w-56 md:w-75"} />}
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
      <span className="hidden sm:flex">{name}</span>

      {/* Active indicator */}
      {isActive && (
        <div className="bg-primary absolute -bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full transition-opacity duration-200" />
      )}
    </SimpleLink>
  );
}

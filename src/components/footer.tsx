"use client";

import { cn } from "@/common/utils";
import SimpleLink from "@/components/simple-link";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";
import GithubLogo from "./logos/logos/github-logo";

type FooterLink = {
  name: string;
  href: string;
  shortName?: string;
};

type SocialLinkType = {
  name: string;
  logo: ReactElement;
  href: string;
};

const links: { [category: string]: FooterLink[] } = {
  App: [
    { name: "Player Lookup", shortName: "Player", href: "/" },
    { name: "Capes", href: "/capes" },
    { name: "Servers", href: "/servers" },
  ],
  Resources: [
    {
      name: "Source Code",
      shortName: "Source",
      href: "https://github.com",
    },
  ],
};

const socialLinks: SocialLinkType[] = [
  {
    name: "GitHub",
    logo: <GithubLogo className="size-5 lg:size-6" />,
    href: "https://github.com",
  },
];

export default function Footer() {
  return (
    <footer
      className={cn(
        "border-border flex shrink-0 flex-col justify-between gap-10 border-t px-10 py-5 select-none lg:gap-0 bg-secondary/60 mt-5",
      )}
    >
      <div className="flex justify-center">
        <div className="flex w-full max-w-(--breakpoint-2xl) flex-col items-center justify-between gap-7 lg:flex-row lg:items-start">
          {/* Branding & social */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
              <SimpleLink
                className="flex items-center gap-3 transition-all hover:opacity-75"
                href="/"
                draggable={false}
              >
                <Image
                  src="/logo.png"
                  alt="MC Utils"
                  width={36}
                  height={36}
                  className="size-9"
                />
                <h1 className="text-primary text-xl font-bold">MC Utils</h1>
              </SimpleLink>
              <p className="max-w-md text-sm opacity-85">
                API for Minecraft player data (skins, capes, profiles),
                Java/Bedrock server status and previews.
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 lg:justify-start">
              {socialLinks.map((link) => (
                <SimpleLink
                  key={link.name}
                  className="transition-all hover:opacity-75"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  aria-label={link.name}
                >
                  {link.logo}
                </SimpleLink>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="flex gap-20 transition-all md:gap-32">
            {Object.entries(links).map(([title, linkList]) => (
              <div key={title} className="flex flex-col gap-0.5">
                <h2 className="text-primary pb-0.5 text-lg font-semibold">
                  {title}
                </h2>
                {linkList.map((link) => {
                  const external = !link.href.startsWith("/");
                  return (
                    <SimpleLink
                      key={link.name}
                      className="flex items-center gap-2 text-sm transition-all hover:opacity-75"
                      href={link.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      draggable={false}
                    >
                      {link.shortName ? (
                        <>
                          <span className="hidden sm:inline">{link.name}</span>
                          <span className="sm:hidden">{link.shortName}</span>
                        </>
                      ) : (
                        <span>{link.name}</span>
                      )}
                      {external && (
                        <ExternalLink className="size-3.5 h-3.5 w-3.5" />
                      )}
                    </SimpleLink>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

import "./styles/globals.css";
import type { Metadata } from "next";
import { QueryProvider } from "../providers/query-provider";
import Navbar from "../components/navbar/navbar";
import localFont from "next/font/local";
import Background from "@/components/background";

const siteFont = localFont({
  src: "./fonts/JetBrainsMono.ttf",
  weight: "100 300",
});

export const metadata: Metadata = {
  title: "MC Utils",
  description: "API for Minecraft player data (skins, capes, profiles), Java/Bedrock server status and previews."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryProvider>
        <body
          className={`${siteFont.className} h-full w-full antialiased`}
        >
          <Background />
          <Navbar />
          <div className="z-1 flex w-full grow flex-col gap-2 px-2 pt-2">
            <div className="m-auto max-w-[1600px]">
              {children}
            </div>
          </div>
        </body>
      </QueryProvider>
    </html>
  );
}

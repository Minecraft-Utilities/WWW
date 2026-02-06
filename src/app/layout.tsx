import "./styles/globals.css";
import type { Metadata } from "next";
import { QueryProvider } from "../providers/query-provider";
import Navbar from "../components/navbar/navbar";
import localFont from "next/font/local";
import Background from "@/components/background";
import { ViewportProvider } from "@/components/context/viewport-context";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";

const siteFont = localFont({
  src: "./fonts/JetBrainsMono.ttf",
  weight: "100 300",
});

export const metadata: Metadata = {
  title: {
    default: "MC Utils",
    template: "%s | MC Utils",
  },
  description:
    "API for Minecraft player data (skins, capes, profiles), Java/Bedrock server status and previews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <QueryProvider>
        <ViewportProvider>
          <body
            className={`${siteFont.className} flex min-h-full w-full flex-col antialiased`}
          >
            <Navbar />
            <Background />
            <main className="relative flex min-h-0 flex-1 flex-col w-full">
              <Toaster />
              <div className="z-1 flex min-h-0 flex-1 flex-col gap-2 pt-2">
                <div className="max-w-[1600px] mx-auto w-full shrink-0">
                  {children}
                </div>
                <div className="min-h-0 flex-1" aria-hidden />
                <Footer />
              </div>
            </main>
          </body>
        </ViewportProvider>
      </QueryProvider>
    </html>
  );
}

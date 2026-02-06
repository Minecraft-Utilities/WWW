import Image from "next/image";

interface BackgroundProps {
  url: string;
}

const height = 500;
export default function Background({ url }: BackgroundProps) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 -z-50 overflow-hidden select-none"
      style={{ height: `${height}px` }}
      aria-hidden
    >
      <Image
        src={url}
        alt="Background"
        width={1920}
        height={height}
        fetchPriority="high"
        unoptimized
        className="h-full w-full object-cover blur-[10px]"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,var(--background)_100%),linear-gradient(to_bottom,transparent_0%,transparent_10%,rgba(0,0,0,0.5)_100%)]"
        aria-hidden
      />
    </div>
  );
}

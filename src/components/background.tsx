import Image from "next/image";

export default function Background() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 -z-50 h-[420px] overflow-hidden select-none"
      aria-hidden
    >
      <Image
        src="https://cdn.fascinated.cc/Isqn4qNG.jpg"
        alt=""
        width={1920}
        height={420}
        fetchPriority="high"
        unoptimized
        className="h-full w-full object-cover blur-md"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,var(--background)_100%),linear-gradient(to_bottom,transparent_0%,transparent_10%,rgba(0,0,0,0.5)_100%)]"
        aria-hidden
      />
    </div>
  );
}

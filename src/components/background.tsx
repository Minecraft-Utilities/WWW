export default function Background() {
  return (
    <div
      className="pointer-events-none absolute top-0 right-0 left-0 -z-50 h-[420px] overflow-hidden select-none"
      aria-hidden
    >
      <img
        src="https://cdn.fascinated.cc/Isqn4qNG.jpg"
        alt=""
        fetchPriority="high"
        className="h-full w-full object-cover"
        style={{
          filter: `blur(6px)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom, transparent 40%, rgb(12, 10, 9) 100%),
            linear-gradient(to bottom, transparent 0%, transparent 10%, rgba(0,0,0,0.5) 100%)
          `,
        }}
        aria-hidden
      />
    </div>
  );
}

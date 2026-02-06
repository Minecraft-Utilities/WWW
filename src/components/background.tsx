export default function Background() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-50 min-h-full select-none"
      aria-hidden
    >
      <img
        src="https://cdn.fascinated.cc/Isqn4qNG.jpg"
        alt=""
        fetchPriority="high"
        className="h-full min-h-full w-full object-cover"
        style={{
          filter: `blur(6px) brightness(50%)`,
        }}
      />
    </div>
  );
}

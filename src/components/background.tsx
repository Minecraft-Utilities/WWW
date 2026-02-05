export default function Background() {
  return (
    <img
      src="https://cdn.fascinated.cc/Isqn4qNG.jpg"
      alt="Background image"
      fetchPriority="high"
      className="pointer-events-none fixed -z-50 h-screen w-screen object-cover select-none"
      style={{
        filter: `blur(6px) brightness(50%)`,
      }}
    />
  );
}

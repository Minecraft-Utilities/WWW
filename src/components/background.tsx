export default function Background() {
  return (
    <div className="pointer-events-none fixed -z-50 h-screen w-screen object-cover select-none">
      <div className="absolute inset-0 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(90,88,160,0.18),rgba(0,0,0,0.85))]" />
    </div>
  );
}

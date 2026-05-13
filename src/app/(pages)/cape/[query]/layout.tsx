import Background from "@/components/background";

export default function CapeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Background url="https://cdn.fascinated.cc/PtiTRsq6.jpg" />
      {children}
    </>
  );
}

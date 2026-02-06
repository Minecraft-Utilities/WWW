import Background from "@/components/background";

export default function ServerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Background url="https://cdn.fascinated.cc/wjLURHpJ.jpg" />
      {children}
    </>
  );
}

import Background from "@/components/background";

export default function PlayerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Background url="https://cdn.fascinated.cc/kwSziDTE.jpg" />
      {children}
    </>
  );
}

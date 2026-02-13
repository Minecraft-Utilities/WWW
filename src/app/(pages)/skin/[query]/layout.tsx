import Background from "@/components/background";

export default function CapesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Background url="https://cdn.fascinated.cc/MB41Oc3y.jpg" />
      {children}
    </>
  );
}

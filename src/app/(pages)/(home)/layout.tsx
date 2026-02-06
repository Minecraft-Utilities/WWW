import Background from "@/components/background";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Background url="https://cdn.fascinated.cc/TeluON8U.jpg" />
      {children}
    </>
  );
}

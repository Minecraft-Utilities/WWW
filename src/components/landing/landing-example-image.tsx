import Image from "next/image";

export default function LandingExampleImage({ url }: { url: string }) {
  return <Image alt="" src={url} width={20} height={20} />;
}

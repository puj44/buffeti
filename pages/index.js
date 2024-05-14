import Banners from "@/components/Homepage/Banners";
import CateringServices from "@/components/Homepage/CateringServices";
import LaunchingSoon from "@/components/LaunchingSoon";
import Image from "next/image";

export default function Home() {
  return (
    <main
      // className={`flex flex-col md:gap-6 gap-4   page-spacing`} style={{alignItems:"stretch"}}
    >
      <LaunchingSoon />
    </main>
  );
}

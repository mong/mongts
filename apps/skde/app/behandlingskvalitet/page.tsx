import type { Metadata } from "next";
import HospitalProfilePage from "@/components/HospitalProfile/HospitalProfilePage";

export const metadata: Metadata = {
  title: "Behandlingskvalitet",
  description:
    "This page shows the quality indicators from national health registries in the Norwegian specialist healthcare service.",
};

export default function Page() {
  return <HospitalProfilePage />;
}

import type { Metadata } from "next";
import { Suspense } from "react";
import HospitalProfilePage from "@/components/HospitalProfile/HospitalProfilePage";
import LoadingFallback from "@/components/LoadingFallback";

export const metadata: Metadata = {
  title: "Sykehusprofil",
  description:
    "This page shows the quality indicators from national health registries in the Norwegian specialist healthcare service.",
};

export default function Page() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HospitalProfilePage />
    </Suspense>
  );
}

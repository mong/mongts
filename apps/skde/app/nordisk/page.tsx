import type { Metadata } from "next";
import { Suspense } from "react";
import LoadingFallback from "@/components/LoadingFallback";
import NordiskeSammenlingninger from "@/components/NordicComparison/NordicComparisonPage";

export const metadata: Metadata = {
  title: "Nordiske sammenligninger",
  description:
    "This page shows the results from national quality registers and compares indicators between nordic countries.",
};

export default function Page() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <NordiskeSammenlingninger />
    </Suspense>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { defaultReviewYear } from "@/app_config";
import LoadingFallback from "@/components/LoadingFallback";
import { RegistryLevelTable } from "@/components/RegistryLevelTable";

export const metadata: Metadata = {
  title: "Stadietabell",
};

const Page = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RegistryLevelTable year={defaultReviewYear} numberOfYears={5} />
    </Suspense>
  );
};

export default Page;

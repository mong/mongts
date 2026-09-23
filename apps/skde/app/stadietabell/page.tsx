import type { Metadata } from "next";
import { defaultReviewYear } from "@/app_config";
import { RegistryLevelTable } from "@/components/RegistryLevelTable";

export const metadata: Metadata = {
  title: "Stadietabell",
};

const Page = () => {
  return <RegistryLevelTable year={defaultReviewYear} numberOfYears={5} />;
};

export default Page;

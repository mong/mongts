import type { Metadata } from "next";
import { defaultReviewYear } from "../../src/app_config";
import { RegistryLevelTable } from "../../src/components/RegistryLevelTable";

export const metadata: Metadata = {
  title: "Stadietabell",
  description: "...",
};

const Page = () => {
  return <RegistryLevelTable year={defaultReviewYear} numberOfYears={5} />;
};

export default Page;

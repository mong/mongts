import type { JSX } from "react";
import { defaultReviewYear } from "../../src/app_config";
import { RegistryLevelTable } from "../../src/components/RegistryLevelTable";

export const Skde = (): JSX.Element => {
  return <RegistryLevelTable year={defaultReviewYear} numberOfYears={5} />;
};

export default Skde;

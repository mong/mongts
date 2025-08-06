import { type JSX } from "react";
import { RegistryLevelTable } from "../../src/components/RegistryLevelTable";
import { defaultReviewYear } from "qmongjs";

export const Skde = (): JSX.Element => {
  return <RegistryLevelTable year={defaultReviewYear} numberOfYears={5} />;
};

export default Skde;

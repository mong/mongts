import { RegistryLevelTable } from "../../src/components/RegistryLevelTable";
import { defaultYear } from "qmongjs";

export const Skde = (): JSX.Element => {
  return <RegistryLevelTable year={defaultYear} numberOfYears={5} />;
};

export default Skde;

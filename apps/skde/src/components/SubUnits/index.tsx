import { NestedTreatmentUnitName } from "types";
import { ItemBox } from "../HospitalProfileStyles";
import { Text } from "@visx/text";

type SubUnitsProps = {
  nestedUnitNames: NestedTreatmentUnitName[];
  selectedUnit: string;
};

const getUnitLevel = (
  RHFs: NestedTreatmentUnitName[],
  selectedUnit: string,
) => {
  let unitLevel: string;

  const RHFNames = RHFs.map((row) => row.rhf);
  const HFs = RHFs.map((row) => row.hf).flat();
  const HFNames = HFs.map((row) => row.hf);

  selectedUnit === "Nasjonalt"
    ? (unitLevel = "Nasjonalt")
    : RHFNames.includes(selectedUnit)
      ? (unitLevel = "RHF")
      : HFNames.includes(selectedUnit)
        ? (unitLevel = "HF")
        : (unitLevel = "Hospital");

  return unitLevel;
};

export const SubUnits = (props: SubUnitsProps) => {
  const { nestedUnitNames, selectedUnit } = props;

  const unitLevel = getUnitLevel(nestedUnitNames, selectedUnit);

  return (
    <ItemBox>
      <Text
        x={"10%"}
        y={50}
        width={500}
        verticalAnchor="start"
        style={{ fontWeight: 700, fontSize: 24 }}
      >
        Utvalgte indikatorer
      </Text>
      <Text
        x={"10%"}
        width={500}
        verticalAnchor="start"
        style={{ fontWeight: 500, fontSize: 18 }}
      >
        {unitLevel}
      </Text>
    </ItemBox>
  );
};

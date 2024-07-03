import { NestedTreatmentUnitName } from "types";
import { ItemBox } from "../HospitalProfileStyles";
import { Text } from "@visx/text";

type SubUnitsProps = {
  nestedUnitNames: NestedTreatmentUnitName;
  selectedUnit: string;
};

export const SubUnits = (props: SubUnitsProps) => {
  const { nestedUnitNames, selectedUnit } = props;

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
    </ItemBox>
  );
};

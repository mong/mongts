import { Typography } from "@mui/material";
import { ItemBox } from "../HospitalProfileStyles";
import { SubUnits } from "../SubUnits";
import { NestedTreatmentUnitName, OptsTu } from "types";

type AffiliatedHospitalProps = {
  boxHeight: number;
  titleStyle: { marginLeft: number; marginTop: number };
  unitNames: { nestedUnitNames: NestedTreatmentUnitName[]; opts_tu: OptsTu[] };
  selectedTreatmentUnit: string;
};

export const AffiliatedHospitals = (props: AffiliatedHospitalProps) => {
  const { boxHeight, titleStyle, unitNames, selectedTreatmentUnit } = props;

  return (
    <ItemBox height={boxHeight} sx={{ overflow: "auto" }}>
      <Typography variant="h5" style={titleStyle}>
        <b>Tilknyttede behandlingssteder</b>
      </Typography>
      {unitNames ? (
        <SubUnits
          RHFs={unitNames.nestedUnitNames}
          selectedUnit={selectedTreatmentUnit}
        />
      ) : null}
    </ItemBox>
  );
};

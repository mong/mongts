import { NestedTreatmentUnitName } from "types";
import { List, ListItem } from "@mui/material";
import { StyledLink } from "../HospitalProfileStyles";

type SubUnitsProps = {
  RHFs: NestedTreatmentUnitName[];
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
  const { RHFs, selectedUnit } = props;

  const HFs = RHFs.map((row) => row.hf).flat();
  const unitLevel = getUnitLevel(RHFs, selectedUnit);

  return unitLevel === "Nasjonalt" ? (
    <List>
      {RHFs.sort((a, b) => a.rhf_sort - b.rhf_sort)
        .map((row) => row.rhf)
        .map((rhf) => {
          return (
            <ListItem key={"subunit-link-" + rhf}>
              <StyledLink
                href={"/sykehusprofil/?selected_treatment_units=" + rhf}
              >
                {rhf}
              </StyledLink>
            </ListItem>
          );
        })}
    </List>
  ) : unitLevel === "RHF" ? (
    <List>
      {RHFs.filter((row) => row.rhf === selectedUnit)[0].hf.map((row) => {
        return (
          <ListItem key={"subunit-link-" + row.hf}>
            <StyledLink
              href={"/sykehusprofil/?selected_treatment_units=" + row.hf}
            >
              {row.hf}
            </StyledLink>
          </ListItem>
        );
      })}
    </List>
  ) : unitLevel === "HF" ? (
    <List>
      {HFs.filter((row) => row.hf === selectedUnit)[0].hospital.map(
        (hospital) => {
          return (
            <ListItem key={"subunit-link-" + hospital}>
              <StyledLink
                href={"/sykehusprofil/?selected_treatment_units=" + hospital}
              >
                {hospital}
              </StyledLink>
            </ListItem>
          );
        },
      )}
    </List>
  ) : null;
};

import { NestedTreatmentUnitName } from "types";
import { List, ListItem, ListItemText } from "@mui/material";

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

  return unitLevel === "RHF" ? (
    <List>
      {RHFs.sort((a, b) => a.rhf_sort - b.rhf_sort).map((row) => {
        return (
          <>
            <ListItem>
              <ListItemText primary={row.rhf} />
            </ListItem>

            <List sx={{ marginLeft: 10 }}>
              {row.hf
                .sort((a, b) => a.hf_sort - b.hf_sort)
                .map((row) => {
                  return (
                    <ListItem>
                      <ListItemText primary={row.hf} />
                    </ListItem>
                  );
                })}
            </List>
          </>
        );
      })}
    </List>
  ) : unitLevel === "HF" ? (
    <List>
      {HFs.sort((a, b) => a.hf_sort - b.hf_sort).map((row) => {
        return (
          <ListItem>
            <ListItemText primary={row.hf} />
          </ListItem>
        );
      })}
    </List>
  ) : null;
};

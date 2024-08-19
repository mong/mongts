import { NestedTreatmentUnitName } from "types";
import { Button, List, ListItem, Stack, Typography, Box } from "@mui/material";
import { LocalHospital } from "@mui/icons-material";
import { skdeTheme } from "qmongjs";

type SubUnitsProps = {
  RHFs: NestedTreatmentUnitName[];
  selectedUnit: string;
};

const getUnitLevel = (
  RHFs: NestedTreatmentUnitName[],
  selectedUnit: string,
) => {
  const RHFNames = RHFs.map((row) => row.rhf);
  const HFs = RHFs.map((row) => row.hf).flat();
  const HFNames = HFs.map((row) => row.hf);

  const unitLevel =
    selectedUnit === "Nasjonalt"
      ? "Nasjonalt"
      : RHFNames.includes(selectedUnit)
        ? "RHF"
        : HFNames.includes(selectedUnit)
          ? "HF"
          : "Hospital";

  return unitLevel;
};

const UnitButton = (props: {
  unitName: string;
  buttonVariant: "outlined" | "text" | "contained";
}) => {
  const { unitName, buttonVariant } = props;

  return (
    <Button
      href={"/sykehusprofil/?selected_treatment_units=" + unitName}
      variant={buttonVariant}
    >
      <Stack
        spacing={0.5}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <LocalHospital />
        <Typography variant="button">{unitName}</Typography>
      </Stack>
    </Button>
  );
};

export const SubUnits = (props: SubUnitsProps) => {
  const { RHFs, selectedUnit } = props;

  const HFs = RHFs.map((row) => row.hf).flat();
  const unitLevel = getUnitLevel(RHFs, selectedUnit);

  const buttonVariant = "outlined";

  return unitLevel === "Nasjonalt" ? (
    <List>
      {RHFs.sort((a, b) => a.rhf_sort - b.rhf_sort)
        .map((row) => row.rhf)
        .map((rhf) => {
          return (
            <ListItem key={"subunit-link-" + rhf}>
              <UnitButton unitName={rhf} buttonVariant={buttonVariant} />
            </ListItem>
          );
        })}
    </List>
  ) : unitLevel === "RHF" ? (
    <List>
      {RHFs.filter((row) => row.rhf === selectedUnit)[0]
        .hf.filter(
          (row) =>
            !row.hf.includes("Private") &&
            !row.hf.includes("Avtalespesialister"),
        )
        .map((row) => {
          return (
            <ListItem key={"subunit-link-" + row.hf}>
              <UnitButton unitName={row.hf} buttonVariant={buttonVariant} />
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
              <UnitButton unitName={hospital} buttonVariant={buttonVariant} />
            </ListItem>
          );
        },
      )}
    </List>
  ) : (
    <Box
      sx={{
        backgroundColor: skdeTheme.palette.warning.main,
        marginLeft: 2,
        marginTop: 5,
      }}
    >
      <Typography variant="body1">
        Denne enheten har ingen underliggende enheter.
      </Typography>
    </Box>
  );
};

import { ReactElement } from "react";
import { NestedTreatmentUnitName } from "types";
import { Button, List, ListItem, Stack, Typography, Box } from "@mui/material";
import { LocalHospital, Undo } from "@mui/icons-material";
import { skdeTheme } from "qmongjs";

const getParentUnit = (
  nestedUnitNames: NestedTreatmentUnitName[],
  unitShortName: string,
) => {
  if (!nestedUnitNames || !unitShortName) {
    return null;
  }

  if (unitShortName === "Nasjonalt") {
    return null;
  }

  // Check if unit is a RHF
  const isRHF = nestedUnitNames.map((row) => row.rhf).includes(unitShortName);

  if (isRHF) {
    return "Nasjonalt";
  }

  // Check if unit is a HF
  const HFs = nestedUnitNames.map((row) => row.hf).flat();
  const isHF = HFs.map((row) => row.hf).includes(unitShortName);

  if (isHF) {
    return nestedUnitNames.filter((row) => {
      return row.hf.map((hf) => hf.hf).includes(unitShortName);
    })[0].rhf;
  }

  // Check if unit is a hospital
  return HFs.filter((row) => {
    return row.hospital.includes(unitShortName);
  })[0].hf;
};

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

  let buttonList: ReactElement;

  const parentUnit = getParentUnit(RHFs, selectedUnit);
  console.log(parentUnit);

  if (unitLevel === "Nasjonalt") {
    buttonList = (
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
    );
  } else if (unitLevel === "RHF") {
    buttonList = (
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
    );
  } else if (unitLevel === "HF") {
    buttonList = (
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
    );
  } else {
    buttonList = (
      <List
        sx={{
          backgroundColor: skdeTheme.palette.warning.main,
          marginLeft: 2,
          marginTop: 5,
        }}
      >
        <Typography variant="body1">
          Denne enheten har ingen underliggende enheter.
        </Typography>
      </List>
    );
  }

  return (
    <>
      {buttonList}
      <Box marginLeft={2} marginTop={4}>
        {parentUnit && (
          <Button
            variant="contained"
            href={"/sykehusprofil/?selected_treatment_units=" + parentUnit}
          >
            <Undo /> <Typography variant="button">Opp et nivå</Typography>{" "}
          </Button>
        )}
      </Box>
    </>
  );
};

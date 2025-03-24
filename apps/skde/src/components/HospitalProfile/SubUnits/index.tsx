import { ReactElement } from "react";
import { NestedTreatmentUnitName } from "types";
import { Button, List, ListItem, Stack, Typography, Box } from "@mui/material";
import { LocalHospital, Undo } from "@mui/icons-material";
import { skdeTheme } from "qmongjs";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// Find the unit one level above the given unit
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
    return nestedUnitNames.find((row) => {
      return row.hf.map((hf) => hf.hf).includes(unitShortName);
    }).rhf;
  }

  // Check if unit is a hospital
  return HFs.find((row) => {
    return row.hospital.includes(unitShortName);
  }).hf;
};

type SubUnitsProps = {
  RHFs: NestedTreatmentUnitName[];
  selectedUnit: string;
  setUnitName: React.Dispatch<React.SetStateAction<string>>;
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

// This button sets the new unit name and updates the URL query parameter "selected_treatment_unit"
const UnitButton = (props: {
  unitName: string;
  buttonVariant: "outlined" | "text" | "contained";
  setUnitName: React.Dispatch<React.SetStateAction<string>>;
  returnButton?: boolean;
}) => {
  const { unitName, buttonVariant, setUnitName, returnButton } = props;

  // Router for updating the query parameter
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());
  params.set("selected_treatment_units", unitName);

  // Symbol and text for the button
  const symbol = returnButton ? <Undo /> : <LocalHospital />;

  return (
    <Button
      onClick={() => {
        router.replace(pathname + "?" + params.toString(), { scroll: false });
        setUnitName(unitName);
      }}
      variant={buttonVariant}
      data-testid={`subunit_button_${unitName}`}
    >
      <Stack
        spacing={0.5}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        {symbol}
        <Typography variant="button">{unitName}</Typography>
      </Stack>
    </Button>
  );
};

export const SubUnits = (props: SubUnitsProps) => {
  const { RHFs, selectedUnit, setUnitName } = props;

  const HFs = RHFs.map((row) => row.hf).flat();
  const unitLevel = getUnitLevel(RHFs, selectedUnit);

  const buttonVariant = "outlined";

  let buttonList: ReactElement;

  const parentUnit = getParentUnit(RHFs, selectedUnit);

  // Logic for handling the four different unit levels
  // Nasjonalt, RHF, HF and sykehus
  if (unitLevel === "Nasjonalt") {
    buttonList = (
      <List>
        {RHFs.sort((a, b) => a.rhf_sort - b.rhf_sort)
          .map((row) => row.rhf)
          .map((rhf) => {
            return (
              <ListItem key={"subunit-link-" + rhf}>
                <UnitButton
                  unitName={rhf}
                  buttonVariant={buttonVariant}
                  setUnitName={setUnitName}
                />
              </ListItem>
            );
          })}
      </List>
    );
  } else if (unitLevel === "RHF") {
    buttonList = (
      <List>
        {RHFs.find((row) => row.rhf === selectedUnit)
          .hf.filter(
            (row) =>
              !row.hf.includes("Private") &&
              !row.hf.includes("Avtalespesialister"),
          )
          .map((row) => {
            return (
              <ListItem key={"subunit-link-" + row.hf}>
                <UnitButton
                  unitName={row.hf}
                  buttonVariant={buttonVariant}
                  setUnitName={setUnitName}
                />
              </ListItem>
            );
          })}
      </List>
    );
  } else if (unitLevel === "HF") {
    buttonList = (
      <List>
        {HFs.find((row) => row.hf === selectedUnit).hospital.map((hospital) => {
          return (
            <ListItem key={"subunit-link-" + hospital}>
              <UnitButton
                unitName={hospital}
                buttonVariant={buttonVariant}
                setUnitName={setUnitName}
              />
            </ListItem>
          );
        })}
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
          <UnitButton
            buttonVariant="contained"
            unitName={parentUnit}
            setUnitName={setUnitName}
            returnButton={true}
          ></UnitButton>
        )}
      </Box>
    </>
  );
};

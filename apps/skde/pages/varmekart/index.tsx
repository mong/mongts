import React, { useState, type JSX } from "react";
import { Typography, Button, ThemeProvider, Stack } from "@mui/material";
import {
  QualityAtlasFigure,
  useRegisterNamesQuery,
  defaultYear,
  useMedicalFieldsQuery,
  skdeTheme,
  useUnitNamesQuery,
} from "qmongjs";
import { BreadCrumbPath } from "../../src/components/Header";
import { Header } from "../../src/components/Header";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { NestedTreatmentUnitName } from "types";
import { indicatorInfo } from "qmongjs/src/data/indicators";

export const Skde = (): JSX.Element => {
  const selectedYear = defaultYear;

  const [selectedTreatmentUnits, setSelectedTreatmentUnits] = useState([
    "Nasjonalt",
    "Helse Nord RHF",
  ]);

  // ########################### //
  // ##### Page parameters ##### //
  // ########################### //

  const width = 1000;
  const minBoxWidth = 30;
  const maxBoxWidth = 75;
  const gap = 2;

  const indNameKey = indicatorInfo.map((row) => {
    return {
      indID: row.indId,
      indTitle: row.title,
      registryShortName: row.registry,
    };
  });

  // Header settings
  const breadcrumbs: BreadCrumbPath = [
    {
      link: "https://www.skde.no",
      text: "Forside",
    },
    {
      link: "/varmekart/",
      text: "Varmekart",
    },
  ];

  // ################### //
  // ##### Queries ##### //
  // ################### //

  const medfieldsQuery = useMedicalFieldsQuery();
  const unitNamesQuery = useUnitNamesQuery("all", "caregiver", "ind");
  const registryNameQuery = useRegisterNamesQuery();

  if (
    unitNamesQuery.isFetching ||
    medfieldsQuery.isFetching ||
    registryNameQuery.isFetching
  ) {
    return null;
  }

  const allIndIDs = indicatorInfo.map((row) => row.indId);

  const nestedUnitNames = unitNamesQuery.data
    ?.nestedUnitNames as NestedTreatmentUnitName[];

  const HFs = nestedUnitNames
    .filter((row) => row.rhf == "Helse Nord RHF")
    .map((row) => {
      return row.hf.map((hf) => hf.hf);
    })
    .flat()
    .filter((row) => !row.includes("Private"));

  const hospitals = nestedUnitNames
    .filter((row) => row.rhf == "Helse Nord RHF")
    .map((rhf) => {
      return rhf.hf
        .filter((hf) => !hf.hf.includes("Private"))
        .map((hf) => {
          return hf.hospital;
        })
        .flat();
    })
    .flat();

  // Button
  // This button sets the new unit name and updates the URL query parameter "selected_treatment_unit"
  const SelectUnitLevelButton = (props: {
    buttonVariant: "outlined" | "text" | "contained";
    setSelectedTreatmentUnits: React.Dispatch<React.SetStateAction<string[]>>;
    unitLevel: "RHF" | "HF" | "sykehus";
  }) => {
    const { buttonVariant, setSelectedTreatmentUnits, unitLevel } = props;

    // Router for updating the query parameter
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());

    let unitData = [] as string[];

    if (unitLevel === "HF") {
      unitData = HFs;
    } else if (unitLevel === "sykehus") {
      unitData = hospitals;
    }

    params.set("selected_treatment_units", unitData.join("_"));

    return (
      <Button
        onClick={() => {
          router.replace(pathname + "?" + params.toString(), { scroll: false });
          setSelectedTreatmentUnits(unitData);
        }}
        variant={buttonVariant}
      >
        <Typography variant="button">{"Velg alle " + unitLevel}</Typography>
      </Button>
    );
  };

  return (
    <ThemeProvider theme={skdeTheme}>
      <Header
        bgcolor="surface2.light"
        title={"Varmekart"}
        breadcrumbs={breadcrumbs}
        maxWidth={false}
      >
        Her vises alle kvalitetsindikatorer fra nasjonale medisinske
        kvalitetsregistre i et varmekart.
      </Header>

      <Stack
        direction="row"
        spacing={2}
        sx={{ marginLeft: 2, marginTop: 2, marginBottom: 4 }}
      >
        <SelectUnitLevelButton
          buttonVariant="outlined"
          setSelectedTreatmentUnits={setSelectedTreatmentUnits}
          unitLevel="HF"
        />

        <SelectUnitLevelButton
          buttonVariant="outlined"
          setSelectedTreatmentUnits={setSelectedTreatmentUnits}
          unitLevel="sykehus"
        />
      </Stack>

      <QualityAtlasFigure
        width={width}
        minBoxWidth={minBoxWidth}
        maxBoxWidth={maxBoxWidth}
        gap={gap}
        context={"caregiver"}
        year={selectedYear}
        indIDs={allIndIDs}
        unitNames={selectedTreatmentUnits}
        indNameKey={indNameKey}
      />
    </ThemeProvider>
  );
};

export default Skde;

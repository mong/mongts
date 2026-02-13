import { useState } from "react";
import {
  CssBaseline,
  Link,
  ThemeProvider,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  Stack,
  Button,
} from "@mui/material";
import {
  useRegisterNamesQuery,
  defaultYear,
  treatmentUnitsKey,
  yearKey,
  useMedicalFieldsQuery,
  IndicatorTableBodyV2,
  skdeTheme,
  useUnitNamesQuery,
} from "qmongjs";
import { UseQueryResult } from "@tanstack/react-query";
import TreatmentQualityAppBar from "../../src/components/TreatmentQuality/TreatmentQualityAppBar";
import { Footer } from "../../src/components/Footer";
import { PageWrapper } from "../../src/components/StyledComponents/PageWrapper";
import { IndicatorTableSkeleton } from "qmongjs";
import { LayoutHead } from "../../src/components/LayoutHead";
import { defaultTableContext } from "../../src/utils/valueOrDefault";
import {
  ColourMap,
  updateColourMap,
  getSortedList,
} from "../../src/helpers/functions/chartColours";
import checkParamsReady from "../../src/utils/checkParamsReady";

export default function TreatmentQualityPage() {
  const [useBeta, setUseBeta] = useState(false);

  const numberOfYearOptions = 5;

  const defaultTreatmentUnits = ["Nasjonalt"];

  // Used by indicator table
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [selectedTableContext, setSelectedTableContext] =
    useState(defaultTableContext);
  const [selectedLevel, setSelectedLevel] = useState<string | undefined>();
  const [selectedMedicalFields, setSelectedMedicalFields] = useState<string[]>(
    [],
  );
  const [selectedTreatmentUnits, setSelectedTreatmentUnits] = useState(
    defaultTreatmentUnits,
  );
  const [dataQualitySelected, setDataQualitySelected] =
    useState<boolean>(false);

  const [colourMap, setColourMap] = useState<ColourMap[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unitNamesQuery: UseQueryResult<any, unknown> = useUnitNamesQuery(
    selectedMedicalFields[0] ? selectedMedicalFields[0] : "all",
    selectedTableContext,
    dataQualitySelected ? "dg" : "ind",
  );

  // Load register names and medical fields
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const registryNameQuery: UseQueryResult<any, unknown> =
    useRegisterNamesQuery();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const medicalFieldsQuery: UseQueryResult<any, unknown> =
    useMedicalFieldsQuery();

  const queriesReady =
    unitNamesQuery.isFetched &&
    registryNameQuery.isFetched &&
    medicalFieldsQuery.isFetched;

  const paramsReady = checkParamsReady({
    treatmentUnits: selectedTreatmentUnits,
    treatmentUnitsKey: treatmentUnitsKey,
    defaultTreatmentUnits: defaultTreatmentUnits,
    year: selectedYear,
    yearKey: yearKey,
    defaultYear: defaultYear,
    medicalFields: selectedMedicalFields,
  });

  updateColourMap(colourMap, setColourMap, selectedTreatmentUnits);

  const handleYearChange = (event: SelectChangeEvent) => {
    setSelectedYear(Number(event.target.value));
  };

  return (
    <ThemeProvider theme={skdeTheme}>
      <CssBaseline />
      <PageWrapper>
        <LayoutHead
          title="Behandlingskvalitet"
          content="This page shows the quality indicators from national health registries in the Norwegian specialist healthcare service."
          href="/favicon.ico"
        />
        <TreatmentQualityAppBar
          openDrawer={() => false}
          useBeta={useBeta}
          setUseBeta={setUseBeta}
        >
          Resultater fra nasjonale medisinske kvalitetsregistre. Se{" "}
          <Link
            href="https://www.kvalitetsregistre.no/"
            target="_blank"
            rel="noopener"
          >
            kvalitetsregistre.no
          </Link>{" "}
          for mer informasjon.
        </TreatmentQualityAppBar>
        <Stack direction="row" padding={2} spacing={1}>
          <Button variant="outlined">Velg fagområde</Button>
          <Button variant="outlined">Velg behandlingsenheter</Button>
          <FormControl>
            <InputLabel>År</InputLabel>
            <Select
              value={selectedYear.toString()}
              label="År"
              onChange={handleYearChange}
            >
              {[
                ...Array(numberOfYearOptions)
                  .keys()
                  .map((i: number) => {
                    const year = defaultYear - i;
                    return <MenuItem value={year}>{year}</MenuItem>;
                  }),
              ]}
            </Select>
          </FormControl>
        </Stack>
        {queriesReady && paramsReady ? (
          <IndicatorTableBodyV2
            key={"indicator-table2"}
            context={selectedTableContext}
            unitNames={getSortedList(
              colourMap,
              selectedTreatmentUnits,
              "units",
            )}
            year={selectedYear}
            type={dataQualitySelected ? "dg" : "ind"}
            levels={selectedLevel}
            medfields={selectedMedicalFields}
            chartColours={getSortedList(
              colourMap,
              selectedTreatmentUnits,
              "colours",
            )}
          />
        ) : (
          <IndicatorTableSkeleton nRows={10} />
        )}
        <Footer page="behandlingskvalitet" />
      </PageWrapper>
    </ThemeProvider>
  );
}

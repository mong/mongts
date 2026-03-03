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
  Box,
  Typography,
} from "@mui/material";
import {
  useRegisterNamesQuery,
  defaultYear,
  IndicatorTableBodyV2,
  skdeTheme,
} from "qmongjs";
import { UseQueryResult } from "@tanstack/react-query";
import TreatmentQualityAppBar from "../../src/components/TreatmentQuality/TreatmentQualityAppBar";
import { Footer } from "../../src/components/Footer";
import { LayoutHead } from "../../src/components/LayoutHead";
import {
  ColourMap,
  updateColourMap,
  getSortedList,
} from "../../src/helpers/functions/chartColours";
import { TreatmentUnitPopup } from "../../src/components/DialogBox/TreatmentunitPopup";
import { MedicalFieldPopup } from "../../src/components/DialogBox/MedicalFieldPopup";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/router";

type TreatmentQualityPageComponentProps = {
  urlYear: number;
  urlUnits: string[];
  //urlRegistries: string[];
  //urlIndicator: string[];
};

const TreatmentQualityPageComponent = (
  props: TreatmentQualityPageComponentProps,
) => {
  const { urlYear, urlUnits } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  if (!router.isReady) {
    return null;
  }

  const numberOfYearOptions = 5;

  const [useBeta, setUseBeta] = useState(false);

  const defaultTreatmentUnits = ["Nasjonalt"];

  // Used by indicator table
  const [selectedYear, setSelectedYear] = useState(urlYear ?? defaultYear);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedLevel, setSelectedLevel] = useState<string | undefined>();
  const [selectedMedicalFields, setSelectedMedicalFields] = useState<string[]>(
    [],
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedTreatmentUnits, setSelectedTreatmentUnits] = useState(
    urlUnits ?? defaultTreatmentUnits,
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dataQualitySelected, setDataQualitySelected] =
    useState<boolean>(false);

  const [medicalFieldPopupOpen, setMedicalFieldPopupOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [treatmentUnitPopupOpen, setTreatmentUnitPopupOpen] = useState(false);

  const [colourMap, setColourMap] = useState<ColourMap[]>([]);

  // Load register names and medical fields
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const registryNameQuery: UseQueryResult<any, unknown> =
    useRegisterNamesQuery();

  updateColourMap(colourMap, setColourMap, selectedTreatmentUnits);

  const handleYearChange = (event: SelectChangeEvent) => {
    setSelectedYear(Number(event.target.value));
    params.set("year", event.target.value);
    router.replace(pathname + "?" + params.toString());
  };

  const handleMedicalFieldButtonClick = () => {
    setMedicalFieldPopupOpen(true);
  };
  const handleTreatmentUnitButtonClick = () => {
    setTreatmentUnitPopupOpen(true);
  };

  return (
    <ThemeProvider theme={skdeTheme}>
      <CssBaseline />
      <Box
        sx={{
          background: "#F5F5F5",
        }}
      >
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
          <Button variant="outlined" onClick={handleMedicalFieldButtonClick}>
            Velg fagområde
          </Button>
          <MedicalFieldPopup
            open={medicalFieldPopupOpen}
            setOpen={setMedicalFieldPopupOpen}
            onSubmit={setSelectedMedicalFields}
          />
          <Button variant="outlined" onClick={handleTreatmentUnitButtonClick}>
            Velg behandlingsenheter
          </Button>
          <TreatmentUnitPopup
            open={treatmentUnitPopupOpen}
            setOpen={setTreatmentUnitPopupOpen}
            selectedTreatmentUnits={selectedTreatmentUnits}
            onSubmit={setSelectedTreatmentUnits}
            context={"caregiver"}
            type={"ind"}
          />
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
                    return (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    );
                  }),
              ]}
            </Select>
          </FormControl>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {selectedMedicalFields.length > 0 ? (
            <IndicatorTableBodyV2
              key={"indicator-table2"}
              context={"caregiver"}
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
            <Stack
              width="80%"
              height="484px"
              spacing={6}
              justifyContent="center"
              alignItems="center"
              sx={{
                background: "#FFFFFF",
                border: "1px solid #2354AE",
                borderRadius: "16px",
              }}
            >
              <Typography variant="h3" color="#0D244E">
                Velg et fagområde du vil se resultater fra
              </Typography>
              <Button
                variant="contained"
                onClick={handleMedicalFieldButtonClick}
                sx={{
                  width: "200px",
                  background: "#2354AE",
                  color: "#FFFFFF",
                  height: "48px",
                  fontSize: "14px",
                }}
              >
                Velg fagområde
              </Button>
            </Stack>
          )}
        </Box>
      </Box>
      <Footer page="behandlingskvalitet" />
    </ThemeProvider>
  );
};

export default function TreatmentQualityPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlYear = searchParams.get("year") && Number(searchParams.get("year"));
  const urlUnits =
    searchParams.get("units") && searchParams.get("units").split("_");

  if (router.isReady) {
    return (
      <TreatmentQualityPageComponent urlYear={urlYear} urlUnits={urlUnits} />
    );
  }
}

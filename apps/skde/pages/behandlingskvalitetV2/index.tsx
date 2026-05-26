import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import type { UseQueryResult } from "@tanstack/react-query";
import {
  defaultYear,
  mainQueryParamsConfig,
  skdeTheme,
  useRegisterNamesQuery,
  useUnitNamesQuery,
} from "qmongjs";
import { useState } from "react";
import { useQueryParam } from "use-query-params";
import { MedicalFieldPopup } from "../../src/components/DialogBox/MedicalFieldPopup";
import { TreatmentUnitPopup } from "../../src/components/DialogBox/TreatmentunitPopup";
import { Footer } from "../../src/components/Footer";
import { IndicatorTableV2 } from "../../src/components/IndicatorTable/Indicatortable";
import { TreatmentQualityAppBarV2 } from "../../src/components/IndicatorTable/Indicatortable/StickyHeader";
import { LayoutHead } from "../../src/components/LayoutHead";
import { PageWrapper } from "../../src/components/StyledComponents/PageWrapper";
import {
  type ColourMap,
  getSortedList,
  updateColourMap,
} from "../../src/helpers/functions/chartColours";
import { defaultTableContext } from "../../src/utils/valueOrDefault";

export default function TreatmentQualityPage() {
  const numberOfYearOptions = 5;

  const defaultTreatmentUnits = ["Nasjonalt"];

  // Used by indicator table
  const [selectedYear = defaultYear, setSelectedYear] = useQueryParam<
    number | undefined
  >("year", mainQueryParamsConfig.year);

  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  const [selectedTableContext, setSelectedTableContext] =
    useState(defaultTableContext);

  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  const [selectedLevel, setSelectedLevel] = useState<string | undefined>();

  const [selectedMedicalFields = [], setSelectedMedicalFields] = useQueryParam<
    string[] | undefined
    // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  >("registries", mainQueryParamsConfig.registries as any);

  const [
    selectedTreatmentUnits = defaultTreatmentUnits,
    setSelectedTreatmentUnits,
  ] = useQueryParam<string[] | undefined>("units", mainQueryParamsConfig.units);

  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  const [dataQualitySelected, setDataQualitySelected] =
    useState<boolean>(false);

  const [medicalFieldPopupOpen, setMedicalFieldPopupOpen] = useState(false);
  const [treatmentUnitPopupOpen, setTreatmentUnitPopupOpen] = useState(false);

  const [colourMap, setColourMap] = useState<ColourMap[]>([]);

  // State for the copy url button.
  // When the button is pressed it should change for a duration of time to show the user that the action is done.
  const [urlCopied, setUrlCopied] = useState<boolean>(false);
  const urlCopiedTimeout = 3000;

  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  const unitNamesQuery: UseQueryResult<unknown, unknown> = useUnitNamesQuery(
    selectedMedicalFields[0] ? selectedMedicalFields[0] : "all",
    selectedTableContext,
    dataQualitySelected ? "dg" : "ind",
  );

  // Load register names and medical fields
  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  const registryNameQuery: UseQueryResult<unknown, unknown> =
    useRegisterNamesQuery();

  updateColourMap(colourMap, setColourMap, selectedTreatmentUnits);

  const handleYearChange = (event: SelectChangeEvent) => {
    setSelectedYear(Number(event.target.value));
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
      <PageWrapper>
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

          <Box padding={4}>
            <TreatmentQualityAppBarV2>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ paddingTop: 2, paddingBottom: 2 }}
                width="100%"
              >
                <Stack direction="row" spacing={3}>
                  <Button
                    variant="outlined"
                    onClick={handleMedicalFieldButtonClick}
                  >
                    Velg fagområde
                  </Button>
                  <MedicalFieldPopup
                    open={medicalFieldPopupOpen}
                    updateRegistries={setSelectedMedicalFields}
                    setOpen={setMedicalFieldPopupOpen}
                    onSubmit={setSelectedMedicalFields}
                  />
                  <Button
                    variant="outlined"
                    onClick={handleTreatmentUnitButtonClick}
                  >
                    Velg behandlingsenheter
                  </Button>
                  <TreatmentUnitPopup
                    open={treatmentUnitPopupOpen}
                    setOpen={setTreatmentUnitPopupOpen}
                    onSubmit={setSelectedTreatmentUnits}
                    context={selectedTableContext}
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
                <Button
                  variant="outlined"
                  startIcon={urlCopied ? <DoneIcon /> : <ContentCopyIcon />}
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setUrlCopied(true);
                    setTimeout(() => {
                      setUrlCopied(false);
                    }, urlCopiedTimeout);
                  }}
                >
                  {urlCopied ? "URL kopiert" : "Kopier URL"}
                </Button>
              </Stack>
            </TreatmentQualityAppBarV2>
            {selectedMedicalFields.length > 0 ? (
              <IndicatorTableV2
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
              <Stack
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
        <Footer />
      </PageWrapper>
    </ThemeProvider>
  );
}

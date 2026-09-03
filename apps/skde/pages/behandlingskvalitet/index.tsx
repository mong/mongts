import {
  Button,
  Dropdown,
  HeroBanner,
  Icon,
  PageContent,
} from "@mong/material-ui";
import { Box, type SelectChangeEvent, Stack } from "@mui/material";
import { useState } from "react";
import { useQueryParam } from "use-query-params";
import { defaultYear, mainQueryParamsConfig } from "../../src/app_config";
import { MedicalFieldPopup } from "../../src/components/DialogBox/MedicalFieldPopup";
import { TreatmentUnitPopup } from "../../src/components/DialogBox/TreatmentunitPopup";
import { IndicatorTableV2 } from "../../src/components/IndicatorTable/Indicatortable";
import { TreatmentQualityAppBarV2 } from "../../src/components/IndicatorTable/Indicatortable/StickyHeader";
import { LayoutHead } from "../../src/components/LayoutHead";
import {
  type ColourMap,
  getSortedList,
  updateColourMap,
} from "../../src/helpers/functions/chartColours";

export default function TreatmentQualityPage() {
  const numberOfYearOptions = 5;

  const defaultTreatmentUnits = ["Nasjonalt"];

  // Used by indicator table
  const [selectedYear = defaultYear, setSelectedYear] = useQueryParam<
    number | undefined
  >("year", mainQueryParamsConfig.year);

  const selectedTableContext = "caregiver";

  const [selectedMedicalFields = [], setSelectedMedicalFields] = useQueryParam<
    string[] | undefined
    // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  >("registries", mainQueryParamsConfig.registries as any);

  const [
    selectedTreatmentUnits = defaultTreatmentUnits,
    setSelectedTreatmentUnits,
  ] = useQueryParam<string[] | undefined>(
    "units",
    // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
    mainQueryParamsConfig.units as any,
  );

  const [medicalFieldPopupOpen, setMedicalFieldPopupOpen] = useState(false);
  const [treatmentUnitPopupOpen, setTreatmentUnitPopupOpen] = useState(false);

  const [colourMap, setColourMap] = useState<ColourMap[]>([]);

  // State for the copy url button.
  // When the button is pressed it should change for a duration of time to show the user that the action is done.
  const [urlCopied, setUrlCopied] = useState<boolean>(false);
  const urlCopiedTimeout = 3000;

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

  const yearDropdownItems = {
    groups: [
      {
        items: Array.from({ length: numberOfYearOptions + 1 }, (_, i) => {
          const year = defaultYear + 1 - i;
          return { value: year.toString(), label: year.toString() };
        }),
      },
    ],
  };

  return (
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
      <HeroBanner
        description="Her kan du se resultater fra nasjonale medisinske kvalitetsregistre, og sammenligne indikatorer ved å velge flere sykehus eller regioner"
        title="Behandlingskvalitet"
        image="/hero-bg-4.jpg"
      />
      <div className="flex bg-neutral-0 w-full align-middle items-center justify-center px-12">
        <div className="flex flex-col w-full h-full max-w-360">
          <TreatmentQualityAppBarV2>
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                paddingTop: 2,
                paddingBottom: 2,
              }}
            >
              <Stack direction="row" spacing={3}>
                <div className="flex flex-col text-small font-semibold text-brand-primary-900">
                  Fagområde
                  <Button onClick={handleMedicalFieldButtonClick}>
                    Velg fagområde
                  </Button>
                </div>
                <MedicalFieldPopup
                  open={medicalFieldPopupOpen}
                  updateRegistries={setSelectedMedicalFields}
                  setOpen={setMedicalFieldPopupOpen}
                  onSubmit={setSelectedMedicalFields}
                />
                <div className="flex flex-col text-small font-semibold text-brand-primary-900">
                  Behandlingssteder
                  <Button onClick={handleTreatmentUnitButtonClick}>
                    Velg Behandlingssteder
                  </Button>
                </div>
                <TreatmentUnitPopup
                  open={treatmentUnitPopupOpen}
                  setOpen={setTreatmentUnitPopupOpen}
                  onSubmit={setSelectedTreatmentUnits}
                  context={selectedTableContext}
                  type={"ind"}
                />
                <div className="flex flex-col text-small  font-semibold  text-brand-primary-900">
                  Årstall
                  <Dropdown
                    value={selectedYear.toString()}
                    onChange={handleYearChange}
                    items={yearDropdownItems}
                  />
                </div>
              </Stack>
              <div className="pb-4 pl-6" data-testid="copy-url-button">
                <Button
                  startIcon={<Icon size="small" symbol="content_copy" />}
                  variant="secondary"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setUrlCopied(true);
                    setTimeout(() => {
                      setUrlCopied(false);
                    }, urlCopiedTimeout);
                  }}
                >
                  {urlCopied ? "Link kopiert" : "Kopier denne visningen"}
                </Button>
              </div>
            </Stack>
          </TreatmentQualityAppBarV2>
        </div>
      </div>
      <PageContent>
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
            type={"ind"}
            levels={""}
            medfields={selectedMedicalFields}
            chartColours={getSortedList(
              colourMap,
              selectedTreatmentUnits,
              "colours",
            )}
          />
        ) : (
          <Stack
            spacing={6}
            sx={{
              height: "484px",
              justifyContent: "center",
              alignItems: "center",
              background: "#FFFFFF",
              border: "1px solid #2354AE",
              borderRadius: "16px",
            }}
          >
            <h3>Velg et fagområde du vil se resultater fra</h3>
            <Button onClick={handleMedicalFieldButtonClick}>
              Velg fagområde
            </Button>
          </Stack>
        )}
      </PageContent>
    </Box>
  );
}

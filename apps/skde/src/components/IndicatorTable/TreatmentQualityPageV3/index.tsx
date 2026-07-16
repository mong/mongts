import {
  Box,
  Button,
  Dropdown,
  HeroBanner,
  Icon,
  LoadingLogo,
  PageContent,
} from "@mong/material-ui";
import { type SelectChangeEvent, Stack, Toolbar } from "@mui/material";
import type { UseQueryResult } from "@tanstack/react-query";
import { useIndicatorQuery } from "qmongjs";
import { Suspense, useState } from "react";
import { useQueryParam } from "use-query-params";
import { defaultYear, mainQueryParamsConfig } from "../../../../src/app_config";
import { MedicalFieldPopup } from "../../../../src/components/DialogBox/MedicalFieldPopup";
import { TreatmentUnitPopup } from "../../../../src/components/DialogBox/TreatmentunitPopup";
import { IndicatorTableV3 } from "../../../../src/components/IndicatorTable/IndicatortableV3";
import { LayoutHead } from "../../../../src/components/LayoutHead";
import {
  type ColourMap,
  getSortedList,
  updateColourMap,
} from "../../../../src/helpers/functions/chartColours";
import { ScrollToTop } from "../../scroll-to-top/scroll-to-top";

export const TreatmentQualityPageV3 = () => {
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
        items: Array.from({ length: numberOfYearOptions }, (_, i) => {
          const year = defaultYear - i;
          return { value: year.toString(), label: year.toString() };
        }),
      },
    ],
  };

  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  const nestedDataQuery: UseQueryResult<any, unknown> = useIndicatorQuery({
    nested: true,
  });

  const registerData = nestedDataQuery?.data;
  const isInitialLoading =
    nestedDataQuery.status === "pending" && !registerData;
  const hasLoadingError = nestedDataQuery.status === "error";

  return (
    <>
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
      <Suspense fallback={<LoadingLogo />}>
        <div className="flex bg-neutral-0 w-full align-middle justify-center px-6 md:px-12 sticky top-0 z-60 shadow-xs">
          <div className="flex flex-col w-full h-full max-w-360">
            {registerData && (
              <Toolbar disableGutters={true}>
                <div className="flex flex-row max-w-360 w-full justify-between items-center pb-2 md:pb-4">
                  <div className="flex flex-row md:flex-row gap-6 md:gap-4 w-full">
                    <div className="flex flex-col md:flex-row gap-3">
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
                        Behandlingssted
                        <Button onClick={handleTreatmentUnitButtonClick}>
                          Velg behandlingssted
                        </Button>
                      </div>
                      <TreatmentUnitPopup
                        open={treatmentUnitPopupOpen}
                        setOpen={setTreatmentUnitPopupOpen}
                        onSubmit={setSelectedTreatmentUnits}
                        context={selectedTableContext}
                        type={"ind"}
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="flex flex-col text-small font-semibold text-brand-primary-900">
                        Årstall
                        <Dropdown
                          value={selectedYear.toString()}
                          onChange={handleYearChange}
                          items={yearDropdownItems}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="pb-4 pl-6 hidden md:block"
                    data-testid="copy-url-button"
                  >
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
                </div>
              </Toolbar>
            )}
          </div>
        </div>
        <PageContent>
          {isInitialLoading ? (
            <LoadingLogo />
          ) : hasLoadingError ? (
            <Stack
              height="484px"
              spacing={4}
              justifyContent="center"
              alignItems="center"
              sx={{
                background: "#FFFFFF",
                border: "1px solid #AE2323",
                borderRadius: "16px",
              }}
            >
              <h3>Kunne ikke laste data. Prøv igjen.</h3>
              <Button onClick={() => nestedDataQuery.refetch()}>
                Last på nytt
              </Button>
            </Stack>
          ) : selectedMedicalFields.length > 0 && registerData ? (
            <IndicatorTableV3
              key={"indicator-table2"}
              data={registerData}
              unitNames={getSortedList(
                colourMap,
                selectedTreatmentUnits,
                "units",
              )}
              year={selectedYear}
              medfields={selectedMedicalFields}
              chartColours={getSortedList(
                colourMap,
                selectedTreatmentUnits,
                "colours",
              )}
            />
          ) : registerData ? (
            <Box
              border
              className="flex flex-col items-center justify-center text-brand-primary-600 gap-10 min-h-100 my-10"
            >
              <h3>Velg et fagområde du vil se resultater fra</h3>
              <Button onClick={handleMedicalFieldButtonClick}>
                Velg fagområde
              </Button>
            </Box>
          ) : (
            <Stack
              height="484px"
              spacing={4}
              justifyContent="center"
              alignItems="center"
              sx={{
                background: "#FFFFFF",
                border: "1px solid #2354AE",
                borderRadius: "16px",
              }}
            >
              <h3>Ingen data tilgjengelig for dette valget.</h3>
              <Button onClick={() => nestedDataQuery.refetch()}>
                Last på nytt
              </Button>
            </Stack>
          )}
          <ScrollToTop />
        </PageContent>
      </Suspense>
    </>
  );
};

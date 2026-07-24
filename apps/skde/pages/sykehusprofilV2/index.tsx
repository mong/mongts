import {
  Box,
  Button,
  HeroBanner,
  Icon,
  LoadingLogo,
  PageContent,
  RotateDevice,
  SplitButton,
  SubjectAreaResultCard,
  ToggleButton,
  ToggleButtonGroup,
} from "@mong/material-ui";
import { Toolbar } from "@mui/material";
import type { UseQueryResult } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import {
  getUnitFullName,
  mainHospitals,
  useUnitNamesQuery,
  useUnitUrlsQuery,
} from "qmongjs";
import { type JSX, Suspense, useEffect, useState } from "react";
import type { NestedTreatmentUnitName, OptsTu } from "types";
import { useQueryParam } from "use-query-params";
import { mainQueryParamsConfig } from "../../src/app_config";
import { AchievementResultsBars } from "../../src/components/Charts/AchievementResultsBars";
import { TreatmentUnitPopup } from "../../src/components/DialogBox/TreatmentunitPopup";
import { HospitalProfileLinePlotV2 } from "../../src/components/HospitalProfile/HospitalProfileLinePlotV2";

export const Skde = (): JSX.Element => {
  // States
  const router = useRouter();
  const [unitName, setUnitName] = useState<(string | null)[] | undefined>([]);
  const [urlCopied, setUrlCopied] = useState<boolean>(false);
  const urlCopiedTimeout = 3000;

  // Grab URL params and setUnitNames on load.
  // This is needed to ensure that the unitName state is set correctly when the page is loaded with a URL param.
  const searchParams = useSearchParams();
  const urlTreatmentUnits = searchParams?.get("selected_treatment_units");
  useEffect(() => {
    setUnitName([urlTreatmentUnits || ""]);
  }, [urlTreatmentUnits]);

  //Treatment unit popup
  const [treatmentUnitPopupOpen, setTreatmentUnitPopupOpen] = useState(false);
  const [
    selectedTreatmentUnit = [urlTreatmentUnits],
    setSelectedTreatmentUnit,
  ] = useQueryParam<(string | null)[] | undefined>(
    "selected_treatment_units",
    mainQueryParamsConfig.units,
  );

  const selectedTableContext = "caregiver";
  const handleTreatmentUnitButtonClick = () => {
    setTreatmentUnitPopupOpen(true);
  };
  const handleClearFilters = () => {
    setSelectedTreatmentUnit([]);
  };

  // ############### //
  // Page parameters //
  // ############### //

  // Years for filtering
  const lastYear = new Date().getFullYear() - 1; // Last year is always the previous year
  const pastYears = 10;

  // ####### //
  // Queries //
  // ####### //

  const unitNamesQuery: UseQueryResult<
    { nestedUnitNames: NestedTreatmentUnitName[]; opts_tu: OptsTu[] },
    Error
  > = useUnitNamesQuery("all", "caregiver", "ind");

  // URLs for the web pages to the different treatment units
  const unitUrlsQuery: UseQueryResult<
    { shortName: string; url: string }[],
    Error
  > = useUnitUrlsQuery();
  const unitsData = unitNamesQuery?.data && unitUrlsQuery?.data;

  const hasLoadingError =
    unitNamesQuery.status === "error" || unitUrlsQuery.status === "error";

  // While the router isn't ready the URL params aren't populated yet, so treat
  // it as loading to avoid flashing the "choose a unit" message before the
  // selected unit from the URL is known.
  const isLoading = !router.isReady || !unitsData;

  const selectedUnit = selectedTreatmentUnit[0] ?? null;

  let unitFullName = "";

  if (unitNamesQuery.data) {
    // Only keep the "real" hospitals
    unitNamesQuery.data.nestedUnitNames.forEach((rhf) => {
      rhf.hf.forEach((hf) => {
        hf.hospital = hf.hospital.filter((unit) =>
          mainHospitals.includes(unit),
        );
      });
    });

    unitFullName =
      (unitNamesQuery.data &&
        getUnitFullName(
          unitNamesQuery.data.nestedUnitNames,
          unitName?.[0] ?? "",
        )) ||
      "";
  }
  /**
   *  Check if the selected unit exists in the loaded data. Guards against
   *  invalid units coming from the URL.
   **/
  const isValidUnit =
    !!selectedUnit &&
    !!unitNamesQuery.data?.nestedUnitNames.some(
      (tu) =>
        tu.rhf === selectedUnit ||
        tu.hf.some(
          (hf) => hf.hf === selectedUnit || hf.hospital.includes(selectedUnit),
        ),
    );

  const boxclasses =
    "flex flex-col items-center justify-center  text-dark gap-10 min-h-50 md:min-h-100 my-6";

  return (
    <>
      <HeroBanner
        title="Sykehusprofil"
        description="Her vises alle kvalitetsindikatorer fra nasjonale medisinske
            kvalitetsregistre per behandlingssted."
        image="/hero-bg-2.jpg"
      />
      <Suspense
        fallback={
          <Box padded={false} color="transparent" className="p-10">
            <LoadingLogo message="Laster data" />
          </Box>
        }
      >
        {/* Toolbar */}
        <div
          className={`${hasLoadingError || isLoading ? "hidden" : "hidden md:flex"} bg-neutral-0 w-full align-middle justify-center px-6 md:px-12 sticky top-0 z-60 shadow-xs`}
        >
          <div className="flex flex-col w-full h-full max-w-360">
            <Toolbar disableGutters={true}>
              <div className="flex flex-row max-w-360 w-full justify-between items-center pb-2 md:pb-4">
                <div className="flex flex-row md:flex-row gap-2 md:gap-4 flex-wrap">
                  <div className="flex gap-6">
                    <div className="flex flex-col text-small font-semibold text-brand-primary-900">
                      Behandlingssted
                      <Button onClick={handleTreatmentUnitButtonClick}>
                        Velg behandlingssted
                      </Button>
                    </div>
                    <TreatmentUnitPopup
                      open={treatmentUnitPopupOpen}
                      setOpen={setTreatmentUnitPopupOpen}
                      onSubmit={setUnitName}
                      context={selectedTableContext}
                      type={"ind"}
                      selectionType="single"
                    />
                    <div className="flex flex-col text-small font-semibold text-brand-primary-900">
                      Vis
                      <ToggleButtonGroup
                        onChange={() => {}}
                        orientation="horizontal"
                        value={["måloppnåelse"]}
                      >
                        <ToggleButton
                          aria-label="toggle item1"
                          value="måloppnåelse"
                        >
                          Måloppnåelse
                        </ToggleButton>
                        <ToggleButton
                          aria-label="toggle item2"
                          value="dekningsgrad"
                          disabled
                        >
                          Dekningsgrad
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <div className="flex text-small font-semibold text-brand-primary-900">
                      <Button variant="text" onClick={handleClearFilters}>
                        Tøm filter
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex align-middle justify-center items-center">
                  <div className="flex flex-col text-small font-semibold text-brand-primary-900">
                    <div className="whitespace-nowrap">&nbsp;</div>
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
              </div>
            </Toolbar>
          </div>
        </div>

        {/* Page Content */}
        <PageContent>
          <div className="flex w-full flex-1 min-h-0">
            {/* End Toolbar */}
            {hasLoadingError ? (
              <Box border className={boxclasses}>
                <h4>Feil ved innhenting av data. Prøv igjen.</h4>
                <Button
                  onClick={() => {
                    unitNamesQuery.refetch();
                    unitUrlsQuery.refetch();
                  }}
                >
                  Last på nytt
                </Button>
              </Box>
            ) : isLoading ? (
              <Box padded={false} color="transparent" className="p-10">
                <LoadingLogo message="Laster data" />
              </Box>
            ) : (
              <div className="w-full max-w-360">
                <div className="flex md:hidden flex-col gap-(--spacing-4) p-8 text-brand-primary-600">
                  <RotateDevice message="Innholdet støttes kun på bredere skjermer. Prøv å snu enheten din." />
                </div>

                {!selectedUnit ? (
                  <Box
                    border
                    className={`${boxclasses} hidden md:flex flex-col justify-center`}
                  >
                    <h3 className="text-nowrap">
                      Velg ett behandlingssted du vil se resultater fra
                    </h3>
                    <Button onClick={handleTreatmentUnitButtonClick}>
                      Velg behandlingssted
                    </Button>
                  </Box>
                ) : !isValidUnit ? (
                  <>
                    <h3>"{selectedUnit}" Er ikke et gyldig behandlingssted</h3>
                    <Button onClick={handleTreatmentUnitButtonClick}>
                      Velg behandlingssted
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="w-full h-250 py-6">
                      <div className="flex justify-center w-full">
                        <div className="flex flex-wrap w-full justify-between items-center max-w-360">
                          <Box
                            rounded={false}
                            className="flex justify-between items-center bg-neutral-0 border-none w-full h-28 rounded-lg"
                          >
                            <h3 className="text-brand-primary-600">
                              {selectedTreatmentUnit}
                            </h3>
                            <SplitButton
                              label="Last ned"
                              onClick={() => {}}
                              options={["PDF", "SVG", "PNG", "CSV"]}
                              steps="one-step"
                            />
                          </Box>
                        </div>
                      </div>

                      <div className="flex w-full pt-5">
                        <div className="w-1/2 flex flex-col gap-5">
                          <Box
                            rounded={false}
                            padded={false}
                            className="flex flex-col justify-between h-full text-brand-primary-500 rounded-lg py-10 px-10"
                          >
                            <h4 className="-mt-0.5">Måloppnåelse 2025</h4>
                            <AchievementResultsBars
                              unitNames={[unitName?.toString() || ""]}
                              startYear={lastYear}
                              endYear={lastYear}
                            />
                          </Box>

                          <Box
                            rounded={false}
                            padded={false}
                            className="flex flex-col justify-between h-full text-brand-primary-500 rounded-lg py-10 px-10"
                          >
                            <h4 className="-mt-0.5">Måloppnåelse 2021-2023</h4>
                            <AchievementResultsBars
                              unitNames={[unitName?.toString() || ""]}
                              startYear={lastYear - 3}
                              endYear={lastYear - 1}
                            />
                          </Box>
                        </div>

                        <div className="w-1/2 flex flex-col ml-4 gap-5">
                          <Box
                            rounded={false}
                            padded={false}
                            className="rounded-lg p-10 h-159"
                          >
                            <HospitalProfileLinePlotV2
                              unitFullName={unitFullName}
                              unitNames={unitName?.toString() || ""}
                              lastYear={lastYear}
                              pastYears={pastYears}
                            />
                          </Box>
                          <Box
                            padded={false}
                            rounded={false}
                            className="p-10 rounded-lg text-dark"
                            color="white"
                          >
                            <h4 className="pb-4">10-års trendanalyse</h4>
                            Siden 2015 har høy måloppnåelse økt med 23 %, mens
                            lavmåloppnåelse har blitt redusert med 12 %. Den
                            største forbedringen skjedde mellom 2022 og 2024.
                          </Box>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-col">
                      <div className="flex flex-col w-full gap-2 pb-14">
                        <h4 className="pb-8 pt-14 text-brand-primary-600">
                          Måloppnåelse sortert på fagområde [mock data]
                        </h4>
                        <SubjectAreaResultCard
                          headers={{
                            first: "Fagområde",
                            second: "Målnivå",
                          }}
                          buttonHref="#"
                          high="Høy 92%"
                          low="Lavt 50%"
                          middle="Middels 75%"
                          title="Dagkirurgi"
                        />
                        <SubjectAreaResultCard
                          buttonHref="#"
                          high="Høy 92%"
                          low="Lavt 50%"
                          middle="Middels 75%"
                          title="Dagkirurgi"
                        />
                        <SubjectAreaResultCard
                          buttonHref="#"
                          high="Høy 92%"
                          low="Lavt 50%"
                          middle="Middels 75%"
                          title="Andel trombolyse"
                        />
                        <SubjectAreaResultCard
                          buttonHref="#"
                          high="Høy 92%"
                          low="Lavt 50%"
                          middle="Middels 75%"
                          title="Dagkirurgi"
                        />
                        <SubjectAreaResultCard
                          buttonHref="#"
                          high="Høy 92%"
                          low="Lavt 50%"
                          middle="Middels 75%"
                          title="Dagkirurgi"
                        />
                      </div>
                      <div className="flex flex-col gap-2 pb-14">
                        <h4 className="pb-8 pt-14 text-brand-primary-600">
                          Utvalgte indikatorer for [placeholder behandlingssted]
                        </h4>
                        <SubjectAreaResultCard
                          headers={{
                            first: "Fagområde",
                            second: "Målnivå",
                          }}
                          buttonHref="#"
                          high="Høy 92%"
                          low="Lavt 50%"
                          middle="Middels 75%"
                          title="Dagkirurgi"
                        />
                        <SubjectAreaResultCard
                          buttonHref="#"
                          high="Høy 92%"
                          low="Lavt 50%"
                          middle="Middels 75%"
                          title="Dagkirurgi"
                        />
                        <SubjectAreaResultCard
                          buttonHref="#"
                          high="Høy 92%"
                          low="Lavt 50%"
                          middle="Middels 75%"
                          title="Dagkirurgi"
                        />
                        <SubjectAreaResultCard
                          buttonHref="#"
                          high="Høy 92%"
                          low="Lavt 50%"
                          middle="Middels 75%"
                          title="Dagkirurgi"
                        />
                        <SubjectAreaResultCard
                          buttonHref="#"
                          high="Høy 92%"
                          low="Lavt 50%"
                          middle="Middels 75%"
                          title="Dagkirurgi"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </PageContent>
      </Suspense>
    </>
  );
};

export default Skde;

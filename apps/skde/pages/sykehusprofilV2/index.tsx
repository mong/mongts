import {
  Box,
  Button,
  // Dropdown,
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
import { Stack, Toolbar } from "@mui/material";
import Grid from "@mui/material/Grid";
import type { UseQueryResult } from "@tanstack/react-query";
import { useScreenSize } from "@visx/responsive";
import { useRouter } from "next/router";
import {
  breakpoints,
  getUnitFullName,
  mainHospitals,
  useUnitNamesQuery,
  useUnitUrlsQuery,
} from "qmongjs";
import { type JSX, Suspense, useEffect, useState } from "react";
import type { NestedTreatmentUnitName, OptsTu, URLs } from "types";
import { useQueryParam } from "use-query-params";
import { defaultYear, mainQueryParamsConfig } from "../../src/app_config";
import { TreatmentUnitPopup } from "../../src/components/DialogBox/TreatmentunitPopup";
import { HospitalInfoBox } from "../../src/components/HospitalProfile";
import { AffiliatedHospitals } from "../../src/components/HospitalProfile/AffiliatedHospitals";
import { HospitalProfileLinePlot } from "../../src/components/HospitalProfile/HospitalProfileLinePlot";
import { HospitalProfileLowLevelTable } from "../../src/components/HospitalProfile/HospitalProfileLowLevelTable";
import { HospitalProfileMedfieldTable } from "../../src/components/HospitalProfile/HospitalProfileMedfieldTable";
import { SelectedIndicatorTable } from "../../src/components/HospitalProfile/SelectedIndicatorTable";
import { TurnDeviceBox } from "../../src/components/HospitalProfile/TurnDeviceBox";
import { UnitFilterMenu } from "../../src/components/HospitalProfile/UnitFilterMenu";

const delayResolved = false;
const delayPromise: Promise<void> | null = null;
export const Skde = (): JSX.Element => {
  // States
  const router = useRouter();
  const [unitName, setUnitName] = useState<string>("");
  const [isMobileAndVertical, setIsMobileAndVertical] = useState<boolean>();

  //Treatment unit popup
  const [treatmentUnitPopupOpen, setTreatmentUnitPopupOpen] = useState(false);
  const [selectedTreatmentUnit = [], setSelectedTreatmentUnit] = useQueryParam<
    (string | null)[] | undefined
  >("units", mainQueryParamsConfig.units);

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

  // Styling
  const boxMaxHeight = 800;
  const titleStyle = { marginTop: 20, marginLeft: 20 };
  const textMargin = 20;
  const maxWidth = "xxl";
  const titlePadding = 2;
  const boxWidthLimit = 640;
  const rotateDeviceBoxHeight = 400;
  const topRowBoxHeightXxl = 400;
  const topRowBoxHeightXs = 650;

  // On screen resize
  const { width } = useScreenSize();

  useEffect(() => {
    setIsMobileAndVertical(screen.orientation.type === "portrait-primary");
  });

  const showRotateMessage = isMobileAndVertical && width < boxWidthLimit;

  const TurnDeviceMessage = (
    <TurnDeviceBox height={rotateDeviceBoxHeight} padding={titlePadding} />
  );

  // Years for filtering
  const lastYear = defaultYear;
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
    // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
    unitNamesQuery.data.nestedUnitNames.map((rhf) => {
      // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
      rhf.hf.map((hf) => {
        hf.hospital = hf.hospital.filter((unit) =>
          mainHospitals.includes(unit),
        );
      });
    });

    /** NB: Denne er alltid blank? */
    unitFullName =
      (unitNamesQuery.data &&
        getUnitFullName(unitNamesQuery.data.nestedUnitNames, unitName)) ||
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

  // ############ //
  // Set unit URL //
  // ############ //

  const unitUrl: string =
    unitUrlsQuery.data?.find((row: URLs) => row.shortName === unitName)?.url ||
    "";

  const boxclasses =
    "flex flex-col items-center justify-center text-brand-primary-600 gap-10 min-h-50 md:min-h-100 my-10";
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
          <Box
            color="gray"
            className="w-full flex-1 flex justify-center items-center"
          >
            <LoadingLogo message="Laster data..." />
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
                      onSubmit={setSelectedTreatmentUnit}
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
                      // onClick={() => {
                      //   navigator.clipboard.writeText(window.location.href);
                      //   setUrlCopied(true);
                      //   setTimeout(() => {
                      //     setUrlCopied(false);
                      //   }, urlCopiedTimeout);
                      // }}
                    >
                      Kopier denne visningen
                      {/* {urlCopied ? "Link kopiert" : "Kopier denne visningen"} */}
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
              <Box padded={false} color="transparent" className="p-52">
                <LoadingLogo message="Laster data" />
              </Box>
            ) : (
              <div className="w-full max-w-360">
                <div className="flex md:hidden flex-col gap-(--spacing-4) p-8 text-brand-primary-600">
                  <RotateDevice message="Innholdet støttes kun på bredere skjermer. Prøv å snu enheten din." />
                </div>
                <div className="hidden md:flex">
                  <Box border className={boxclasses} color="white">
                    {!selectedUnit ? (
                      <>
                        <h3>
                          Velg ett behandlingssted du vil se resultater fra
                        </h3>
                        <Button onClick={handleTreatmentUnitButtonClick}>
                          Velg behandlingssted
                        </Button>
                      </>
                    ) : !isValidUnit ? (
                      <>
                        <h3>
                          "{selectedUnit}" Er ikke et gyldig behandlingssted
                        </h3>
                        <Button onClick={handleTreatmentUnitButtonClick}>
                          Velg behandlingssted
                        </Button>
                      </>
                    ) : (
                      <div>
                        {" "}
                        <div className="w-full">
                          {/* <LayoutHead
          title="Sykehusprofil"
          content="This page shows the quality indicators from national health registries in the Norwegian specialist healthcare service for individual treatment units."
          href="/favicon.ico"
        /> */}

                          {/* <Header
          bgcolor="surface2.light"
          title={"Sykehusprofil"}
          maxWidth={maxWidth}
        > */}
                          <div className="flex justify-center w-full">
                            <div className="flex flex-wrap w-full justify-between items-center max-w-360  my-4">
                              <Box className="flex justify-between items-center bg-neutral-0 border-none w-full h-20 md:h-28">
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

                          {/* </Header> */}
                          {/* <PageContent rounded={true}> */}
                          <div className="flex w-full debug">
                            <div className="w-1/2 flex flex-col gap-4">
                              <Box className="p-10!">
                                <h4 className="pb-8">
                                  Måloppnåelse for [yyyy]
                                </h4>
                                [insert graph here]
                              </Box>

                              <Box className="*:rounded-none! *:my-5 *:border [&>Box]:border-gray-200">
                                <h4>Måloppnåelse [yyyy-yyyy]</h4>
                                <Box className="p-10!">s</Box>
                                <Box>s</Box>
                                <Box>s</Box>
                              </Box>
                            </div>
                            <div className="w-1/2 flex flex-col ml-4 gap-4 h-full">
                              <Box className="h-full">
                                <h4 className="pb-8">
                                  Måloppnåelse siste [x] år
                                </h4>
                                [insert graph here]
                              </Box>
                              <Box className="h-fit">10-års trendanalyse</Box>
                            </div>
                          </div>

                          <div className="flex flex-col w-full gap-2 pb-14 debug">
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
                              Utvalgte indikatorer for [placeholder
                              behandlingssted]
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
                          <>
                            {/* <Grid container spacing={2}>
            <Grid
              size={{ xs: 12, sm: 7 }}
              data-testid={`hospital_profile_box_${unitName}`}
            >
              <HospitalInfoBox
                boxHeight={
                  width > breakpoints.xxl
                    ? topRowBoxHeightXxl
                    : topRowBoxHeightXs
                }
                // @ts-expect-error - Ignored to pass ci checks, but should be fixed properly in the future
                unitNames={unitNamesQuery.data}
                // @ts-expect-error - Ignored to pass ci checks, but should be fixed properly in the future
                selectedTreatmentUnit={unitName}
                unitUrl={unitUrl}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 5 }}>
              <AffiliatedHospitals
                boxHeight={
                  width > breakpoints.xxl
                    ? topRowBoxHeightXxl
                    : topRowBoxHeightXs
                }
                titleStyle={titleStyle}
                // @ts-expect-error - Ignored to pass ci checks, but should be fixed properly in the future
                unitNames={unitNamesQuery.data}
                selectedTreatmentUnit={unitName || ""}
                setUnitName={setUnitName}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              {showRotateMessage ? (
                TurnDeviceMessage
              ) : (
                <HospitalProfileMedfieldTable
                  boxMaxHeight={boxMaxHeight}
                  titlePadding={titlePadding}
                  titleStyle={titleStyle}
                  textMargin={textMargin}
                  unitName={unitName || ""}
                  lastYear={lastYear}
                />
              )}
            </Grid>

            <Grid size={{ xs: 12 }}>
              {showRotateMessage ? (
                TurnDeviceMessage
              ) : (
                <HospitalProfileLowLevelTable
                  unitName={unitName?.toString() || ""}
                  boxMaxHeight={boxMaxHeight}
                  titlePadding={titlePadding}
                  titleStyle={titleStyle}
                  textMargin={textMargin}
                  // @ts-expect-error - Ignored to pass ci checks, but should be fixed properly in the future
                  unitFullName={unitFullName}
                  lastYear={lastYear}
                />
              )}
            </Grid>

            <Grid size={{ xs: 12 }}>
              {showRotateMessage ? (
                TurnDeviceMessage
              ) : (
                <HospitalProfileLinePlot
                  // @ts-expect-error - Ignored to pass ci checks, but should be fixed properly in the future
                  unitFullName={unitFullName}
                  unitNames={unitName?.toString() || ""}
                  lastYear={lastYear}
                  pastYears={pastYears}
                  titlePadding={titlePadding}
                  titleStyle={titleStyle}
                  textMargin={textMargin}
                />
              )}
            </Grid>

            <Grid size={{ xs: 12 }}>
              {showRotateMessage ? (
                TurnDeviceMessage
              ) : (
                <SelectedIndicatorTable
                  unitName={unitName || ""}
                  titlePadding={titlePadding}
                  titleStyle={titleStyle}
                  lastYear={lastYear}
                  textMargin={textMargin}
                />
              )}
            </Grid>
          </Grid> */}
                          </>
                        </div>
                      </div>
                    )}
                  </Box>
                </div>
              </div>
            )}
          </div>
        </PageContent>
        {/* ssssss */}
      </Suspense>
    </>
  );
};

export default Skde;

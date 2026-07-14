import {
  Box,
  Button,
  Dropdown,
  HeroBanner,
  Icon,
  PageContent,
  SplitButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mong/material-ui";
import { Toolbar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import type { UseQueryResult } from "@tanstack/react-query";
import { useScreenSize } from "@visx/responsive";
import {
  breakpoints,
  getUnitFullName,
  mainHospitals,
  useUnitNamesQuery,
  useUnitUrlsQuery,
} from "qmongjs";
import { type JSX, useEffect, useState } from "react";
import type { URLs } from "types";
import { defaultYear } from "../../src/app_config";
import { Header } from "../../src/components/Header";
import { HospitalInfoBox } from "../../src/components/HospitalProfile";
import { AffiliatedHospitals } from "../../src/components/HospitalProfile/AffiliatedHospitals";
import { HospitalProfileLinePlot } from "../../src/components/HospitalProfile/HospitalProfileLinePlot";
import { HospitalProfileLowLevelTable } from "../../src/components/HospitalProfile/HospitalProfileLowLevelTable";
import { HospitalProfileMedfieldTable } from "../../src/components/HospitalProfile/HospitalProfileMedfieldTable";
import { SelectedIndicatorTable } from "../../src/components/HospitalProfile/SelectedIndicatorTable";
import { TurnDeviceBox } from "../../src/components/HospitalProfile/TurnDeviceBox";
import { UnitFilterMenu } from "../../src/components/HospitalProfile/UnitFilterMenu";
import { LayoutHead } from "../../src/components/LayoutHead";

export const Skde = (): JSX.Element => {
  // States
  const [unitName, setUnitName] = useState<string>();
  const [isMobileAndVertical, setIsMobileAndVertical] = useState<boolean>();

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

  const unitNamesQuery: UseQueryResult<unknown, Error> = useUnitNamesQuery(
    "all",
    "caregiver",
    "ind",
  );

  // URLs for the web pages to the different treatment units
  const unitUrlsQuery: UseQueryResult<unknown, Error> = useUnitUrlsQuery();

  if (unitNamesQuery.isFetching || unitUrlsQuery.isFetching) {
    // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
    return <></>;
  }

  let unitFullName: string;

  if (unitNamesQuery.data) {
    // Only keep the "real" hospitals
    // @ts-expect-error - Ignored to pass ci checks, but should be fixed properly in the future
    // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
    unitNamesQuery.data.nestedUnitNames.map((rhf) => {
      // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
      rhf.hf.map((hf) => {
        hf.hospital = hf.hospital.filter((unit) =>
          mainHospitals.includes(unit),
        );
      });
    });

    unitFullName =
      (unitNamesQuery.data &&
        // @ts-expect-error - Ignored to pass ci checks, but should be fixed properly in the future
        getUnitFullName(unitNamesQuery.data.nestedUnitNames, unitName)) ||
      "";
  }

  // ############ //
  // Set unit URL //
  // ############ //

  const unitUrl: string =
    // @ts-expect-error - Ignored to pass ci checks, but should be fixed properly in the future
    unitUrlsQuery.data.find((row: URLs) => row.shortName === unitName)?.url ||
    "";

  return (
    <>
      <HeroBanner
        title="Sykehusprofil"
        description="Her vises alle kvalitetsindikatorer fra nasjonale medisinske
            kvalitetsregistre per behandlingsenhet."
        image="/hero-bg-4.jpg"
      />

      {/* Toolbar */}
      <div className="flex bg-neutral-0 w-full align-middle justify-center px-6 md:px-12 sticky top-0 z-60 shadow-xs">
        <div className="flex flex-col w-full h-full max-w-360">
          {
            <Toolbar disableGutters={true}>
              <div className="flex flex-row max-w-360 w-full justify-between items-center pb-2 md:pb-4">
                <div className="flex flex-row md:flex-row gap-2 md:gap-4 flex-wrap">
                  <div className="flex gap-3">
                    <div className="flex flex-col text-small font-semibold text-brand-primary-900">
                      Fagområde
                      <Button
                      //  onClick={handleMedicalFieldButtonClick}
                      >
                        Velg fagområde
                      </Button>
                    </div>
                    {/* <MedicalFieldPopup
                      open={medicalFieldPopupOpen}
                      updateRegistries={setSelectedMedicalFields}
                      setOpen={setMedicalFieldPopupOpen}
                      onSubmit={setSelectedMedicalFields}
                    /> */}
                    <div className="flex flex-col text-small font-semibold text-brand-primary-900">
                      Behandlingsenheter
                      <Button>
                        {/* // onClick={handleTreatmentUnitButtonClick}> */}
                        Velg behandlingsenheter
                      </Button>
                    </div>
                    {/* <TreatmentUnitPopup
                      open={treatmentUnitPopupOpen}
                      setOpen={setTreatmentUnitPopupOpen}
                      onSubmit={setSelectedTreatmentUnits}
                      context={selectedTableContext}
                      type={"ind"}
                    /> */}
                  </div>
                  <div className="flex items-end">
                    <div className="flex text-small font-semibold text-brand-primary-900">
                      <Button variant="text">Tøm filter</Button>
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
          }
        </div>
      </div>
      {/* End Toolbar */}

      <div className="flex justify-center w-full">
        <div className="flex flex-wrap w-full justify-between items-center max-w-360 my-6">
          <Box className="flex justify-between items-center bg-neutral-0 border-none w-full h-20 md:h-28">
            <h3>[Placeholder Behandlingssted]</h3>
            <SplitButton
              label="Last ned"
              onClick={() => {}}
              options={["PDF", "SVG", "PNG", "CSV"]}
              steps="one-step"
            />
          </Box>
        </div>
      </div>
      <PageContent>
        {/* <LayoutHead
          title="Sykehusprofil"
          content="This page shows the quality indicators from national health registries in the Norwegian specialist healthcare service for individual treatment units."
          href="/favicon.ico"
        /> */}

        <Header
          bgcolor="surface2.light"
          title={"Sykehusprofil"}
          maxWidth={maxWidth}
        >
          <Box sx={{ mb: 6 }}>
            Her vises alle kvalitetsindikatorer fra nasjonale medisinske
            kvalitetsregistre per behandlingsenhet.
          </Box>
          <Typography>
            <UnitFilterMenu
              width={Math.min(400, 0.8 * width)}
              setUnitName={setUnitName}
              unitNamesQuery={unitNamesQuery}
              unitName={unitName || ""}
            />
          </Typography>
        </Header>
        {/* <PageContent rounded={true}> */}
        <Grid container spacing={2}>
          <Grid
            size={{ xs: 12, sm: 7 }}
            data-testid={`hospital_profile_box_${unitName}`}
          >
            <HospitalInfoBox
              boxHeight={
                width > breakpoints.xxl ? topRowBoxHeightXxl : topRowBoxHeightXs
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
                width > breakpoints.xxl ? topRowBoxHeightXxl : topRowBoxHeightXs
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
        </Grid>
        {/* </PageContent> */}
      </PageContent>
    </>
  );
};

export default Skde;

import React, { useState, useEffect, type JSX } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { Header, BreadCrumbPath } from "../../src/components/Header";
import {
  skdeTheme,
  useUnitNamesQuery,
  defaultYear,
  mainHospitals,
  useUnitUrlsQuery,
} from "qmongjs";
import { Footer } from "../../src/components/Footer";
import {
  ThemeProvider,
  Box,
  Container,
  Typography,
  CssBaseline,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { PageWrapper } from "../../src/components/StyledComponents/PageWrapper";
import { HospitalInfoBox } from "../../src/components/HospitalProfile";
import { getUnitFullName } from "qmongjs";
import { AffiliatedHospitals } from "../../src/components/HospitalProfile/AffiliatedHospitals";
import { useScreenSize } from "@visx/responsive";
import { breakpoints } from "qmongjs";
import { HospitalProfileMedfieldTable } from "../../src/components/HospitalProfile/HospitalProfileMedfieldTable";
import { HospitalProfileLowLevelTable } from "../../src/components/HospitalProfile/HospitalProfileLowLevelTable";
import { HospitalProfileLinePlot } from "../../src/components/HospitalProfile/HospitalProfileLinePlot";
import { UnitFilterMenu } from "../../src/components/HospitalProfile/UnitFilterMenu";
import { TurnDeviceBox } from "../../src/components/HospitalProfile/TurnDeviceBox";
import { URLs } from "types";
import { LayoutHead } from "../../src/components/LayoutHead";
import { SelectedIndicatorTable } from "../../src/components/HospitalProfile/SelectedIndicatorTable";

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
  const pastYears = 5;

  // Header settings
  const breadcrumbs: BreadCrumbPath = [
    {
      link: "https://www.skde.no",
      text: "Forside",
    },
    {
      link: "/sykehusprofil/",
      text: "Sykehusprofil",
    },
  ];

  // ####### //
  // Queries //
  // ####### //

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unitNamesQuery: UseQueryResult<any, Error> = useUnitNamesQuery(
    "all",
    "caregiver",
    "ind",
  );

  // URLs for the web pages to the different treatment units
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unitUrlsQuery: UseQueryResult<any, Error> = useUnitUrlsQuery();

  if (unitNamesQuery.isFetching || unitUrlsQuery.isFetching) {
    return null;
  }

  let unitFullName: string;

  if (unitNamesQuery.data) {
    // Only keep the "real" hospitals
    unitNamesQuery.data.nestedUnitNames.map((rhf) => {
      rhf.hf.map((hf) => {
        hf.hospital = hf.hospital.filter((unit) =>
          mainHospitals.includes(unit),
        );
      });
    });

    unitFullName =
      unitNamesQuery.data &&
      getUnitFullName(unitNamesQuery.data.nestedUnitNames, unitName);
  }

  // ############ //
  // Set unit URL //
  // ############ //

  const unitUrl: string =
    unitUrlsQuery.data.find((row: URLs) => row.shortName === unitName)?.url ||
    "";

  return (
    <ThemeProvider theme={skdeTheme}>
      <CssBaseline />
      <PageWrapper>
        <LayoutHead
          title="Sykehusprofil"
          content="This page shows the quality indicators from national health registries in the Norwegian specialist healthcare service for individual treatment units."
          href="/favicon.ico"
        />
        <Header
          bgcolor="surface2.light"
          title={"Sykehusprofil"}
          breadcrumbs={breadcrumbs}
          maxWidth={maxWidth}
        >
          <Box sx={{ mb: 6 }}>
            Her vises alle kvalitetsindikatorer fra nasjonale medisinske
            kvalitetsregistre i form av sykehusprofiler.
          </Box>
          <Typography>
            <UnitFilterMenu
              width={Math.min(400, 0.8 * width)}
              setUnitName={setUnitName}
              unitNamesQuery={unitNamesQuery}
              unitName={unitName}
            />
          </Typography>
        </Header>

        <Container maxWidth={maxWidth} disableGutters={true}>
          <Box marginTop={2} className="hospital-profile-box">
            <Grid container spacing={2}>
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
                  unitNames={unitNamesQuery.data}
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
                  unitNames={unitNamesQuery.data}
                  selectedTreatmentUnit={unitName}
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
                    unitName={unitName}
                    lastYear={lastYear}
                  />
                )}
              </Grid>

              <Grid size={{ xs: 12 }}>
                {showRotateMessage ? (
                  TurnDeviceMessage
                ) : (
                  <HospitalProfileLowLevelTable
                    unitName={unitName}
                    boxMaxHeight={boxMaxHeight}
                    titlePadding={titlePadding}
                    titleStyle={titleStyle}
                    textMargin={textMargin}
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
                    unitFullName={unitFullName}
                    unitNames={unitName}
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
                    unitName={unitName}
                    titlePadding={titlePadding}
                    titleStyle={titleStyle}
                    lastYear={lastYear}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Footer
          page="sykehusprofil"
          maxWidth={maxWidth}
          className="hospital-profile-footer"
        />
      </PageWrapper>
    </ThemeProvider>
  );
};

export default Skde;

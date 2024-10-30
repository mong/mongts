import React, { useState, useEffect } from "react";
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
import { ThemeProvider, Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
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
  const breadcrumbs: BreadCrumbPath = {
    path: [
      {
        link: "https://www.skde.no",
        text: "Forside",
      },
      {
        link: "https://www.skde.no/resultater/",
        text: "Tall om helsetjenesten",
      },
      {
        link: "/sykehusprofil/",
        text: "Sykehusprofil",
      },
    ],
  };

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

  let newUnitUrl: URLs | undefined;
  let unitUrl = "";

  if (unitUrlsQuery.data) {
    newUnitUrl = unitUrlsQuery.data.filter((row: URLs) => {
      return row.shortName === unitName;
    });
  }

  if (newUnitUrl && newUnitUrl[0]) {
    unitUrl = newUnitUrl[0].url;
  }

  return (
    <ThemeProvider theme={skdeTheme}>
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
                  boxHeight={width > breakpoints.xxl ? 350 : 450}
                  unitNames={unitNamesQuery.data}
                  selectedTreatmentUnit={unitName}
                  unitUrl={unitUrl}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 5 }}>
                <AffiliatedHospitals
                  boxHeight={width > breakpoints.xxl ? 350 : 450}
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

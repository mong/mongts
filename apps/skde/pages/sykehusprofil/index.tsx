import React, { useState } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import {
  Header,
  HeaderData,
  BreadCrumbPath,
} from "../../src/components/Header";
import {
  skdeTheme,
  useUnitNamesQuery,
  defaultYear,
  mainHospitals,
  useUnitUrlsQuery,
} from "qmongjs";
import { Footer } from "../../src/components/Footer";
import { ThemeProvider, Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { PageWrapper } from "../../src/components/StyledComponents/PageWrapper";
import { HospitalInfoBox } from "../../src/components/HospitalProfile";
import { getUnitFullName } from "../../src/helpers/functions/getUnitFullName";
import { AffiliatedHospitals } from "../../src/components/HospitalProfile/AffiliatedHospitals";
import { useScreenSize } from "@visx/responsive";
import { breakpoints } from "qmongjs";
import { HospitalProfileMedfieldTable } from "../../src/components/HospitalProfile/HospitalProfileMedfieldTable";
import { HospitalProfileLowLevelTable } from "../../src/components/HospitalProfile/HospitalProfileLowLevelTable";
import { HospitalProfileLinePlot } from "../../src/components/HospitalProfile/HospitalProfileLinePlot";
import { UnitFilterMenu } from "../../src/components/HospitalProfile/UnitFilterMenu";
import { TurnDeviceBox } from "../../src/components/HospitalProfile/TurnDeviceBox";

export const Skde = (): JSX.Element => {
  // States
  const [unitName, setUnitName] = useState<string>();
  const [unitUrl, setUnitUrl] = useState<string | null>(null);

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
        link: "/sykehusprofil/",
        text: "Sykehusprofil",
      },
    ],
  };

  const headerData: HeaderData = {
    title: "Sykehusprofil",
    subtitle:
      "Her vises alle kvalitetsindikatorer fra nasjonale medisinske kvalitetsregistre i form av sykehusprofiler",
  };

  // ######## //
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

  return (
    <ThemeProvider theme={skdeTheme}>
      <PageWrapper>
        <Header
          bgcolor="surface2.light"
          headerData={headerData}
          breadcrumbs={breadcrumbs}
          maxWidth={maxWidth}
        >
          <UnitFilterMenu
            width={Math.min(400, 0.8 * width)}
            setUnitName={setUnitName}
            setUnitUrl={setUnitUrl}
            unitNamesQuery={unitNamesQuery}
            unitUrlsQuery={unitUrlsQuery}
          />
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
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                {width > boxWidthLimit ? (
                  <HospitalProfileMedfieldTable
                    boxMaxHeight={boxMaxHeight}
                    titlePadding={titlePadding}
                    titleStyle={titleStyle}
                    textMargin={textMargin}
                    unitName={unitName}
                    lastYear={lastYear}
                  />
                ) : (
                  TurnDeviceMessage
                )}
              </Grid>

              <Grid size={{ xs: 12 }}>
                {width > boxWidthLimit ? (
                  <HospitalProfileLowLevelTable
                    unitName={unitName}
                    boxMaxHeight={boxMaxHeight}
                    titlePadding={titlePadding}
                    titleStyle={titleStyle}
                    textMargin={textMargin}
                    unitFullName={unitFullName}
                    lastYear={lastYear}
                  />
                ) : (
                  TurnDeviceMessage
                )}
              </Grid>

              <Grid size={{ xs: 12 }}>
                {width > boxWidthLimit ? (
                  <HospitalProfileLinePlot
                    unitFullName={unitFullName}
                    unitNames={unitName}
                    lastYear={lastYear}
                    pastYears={pastYears}
                    titlePadding={titlePadding}
                    titleStyle={titleStyle}
                    textMargin={textMargin}
                  />
                ) : (
                  TurnDeviceMessage
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

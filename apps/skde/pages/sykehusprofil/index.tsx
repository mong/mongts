import React, { useState, useEffect } from "react";
import {
  useQueryParam,
  DelimitedArrayParam,
  withDefault,
} from "use-query-params";
import { UseQueryResult } from "@tanstack/react-query";
import {
  Header,
  HeaderData,
  BreadCrumbPath,
} from "../../src/components/Header";
import {
  skdeTheme,
  FilterSettingsValue,
  FilterMenu,
  useUnitNamesQuery,
  useUnitUrlsQuery,
  LowLevelIndicatorList,
  defaultYear,
  TreeViewFilterSection,
  getTreatmentUnitsTree,
  FilterSettings,
  CustomAccordionExpandIcon,
  mainHospitals,
} from "qmongjs";
import { Footer } from "../../src/components/Footer";
import {
  ThemeProvider,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  MedfieldTable,
  MedfieldTableProps,
} from "../../src/components/MedfieldTable";
import { ClickAwayListener } from "@mui/base";
import { PageWrapper } from "../../src/components/StyledComponents/PageWrapper";
import {
  ExpandableItemBox,
  HospitalInfoBox,
} from "../../src/components/HospitalProfile";
import { URLs } from "types";
import { getUnitFullName } from "../../src/helpers/functions/getUnitFullName";
import { ChipSelection } from "../../src/components/ChipSelection";
import { AffiliatedHospitals } from "../../src/components/HospitalProfile/AffiliatedHospitals";
import { useScreenSize } from "@visx/responsive";
import { breakpoints } from "qmongjs";
import { HospitalProfileLinePlot } from "../../src/components/HospitalProfile/HospitalProfileLinePlot";

const AccordionWrapper = styled(Box)(() => ({
  "& MuiAccordion-root:before": {
    backgroundColor: "white",
  },
}));

export const Skde = (): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  const treatmentUnitsKey = "selected_treatment_units";

  const { width } = useScreenSize();

  // Current unit name and its setter function
  const [selectedTreatmentUnits, setSelectedTreatmentUnits] = useQueryParam(
    treatmentUnitsKey,
    withDefault(DelimitedArrayParam, ["Nasjonalt"]),
  );

  // Set infobox image
  const [imgSrc, setImgSrc] = useState(null);

  // Infobox URL
  const [unitUrl, setUnitUrl] = useState<string | null>(null);

  // Get unit names

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unitNamesQuery: UseQueryResult<any, unknown> = useUnitNamesQuery(
    "all",
    "caregiver",
    "ind",
  );

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
      getUnitFullName(
        unitNamesQuery.data.nestedUnitNames,
        selectedTreatmentUnits[0],
      );
  }

  const treatmentUnits = getTreatmentUnitsTree(unitNamesQuery);

  if (treatmentUnits.treedata.length > 1) {
    // Find the index of "Private" and remove the children. The sub units should not be shown.
    // TreetmentUnits.treedata starts with one element "Nasjonalt". Need to wait for it to build up the rest.
    const indPrivate = treatmentUnits.treedata.findIndex(
      (x) => x.nodeValue.value === "Private",
    );
    treatmentUnits.treedata[indPrivate].children = [];
  }

  // The following code ensures that the page renders correctly
  const unitUrlsQuery = useUnitUrlsQuery();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const shouldRefreshInitialState = mounted && unitUrlsQuery.isFetched;

  // Callback function for initialising the filter meny
  const initialiseFilter = (
    filterInput: Map<string, FilterSettingsValue[]>,
  ) => {
    const newUnit = filterInput.get(treatmentUnitsKey).map((el) => el.value);

    setImgSrc("/img/forsidebilder/" + newUnit[0] + ".jpg");

    let unitUrl: URLs | undefined;
    if (unitUrlsQuery.data) {
      unitUrl = unitUrlsQuery.data.filter((row: URLs) => {
        return row.shortName === newUnit[0];
      });
    }

    if (unitUrl && unitUrl[0]) {
      setUnitUrl(unitUrl[0].url);
    } else {
      setUnitUrl(null);
    }
  };

  // Callback function for updating the filter menu
  const handleChange = (filterInput: FilterSettings) => {
    const newUnit = filterInput.map
      .get(treatmentUnitsKey)
      .map((el) => el.value);

    setExpanded(false);
    setSelectedTreatmentUnits(newUnit);

    setImgSrc("/img/forsidebilder/" + newUnit[0] + ".jpg");

    let unitUrl: URLs | undefined;
    if (unitUrlsQuery.data) {
      unitUrl = unitUrlsQuery.data.filter((row: URLs) => {
        return row.shortName === newUnit[0];
      });
    }

    if (unitUrl && unitUrl[0]) {
      setUnitUrl(unitUrl[0].url);
    } else {
      setUnitUrl(null);
    }
  };

  // Year for filtering
  const lastYear = defaultYear;
  const pastYears = 5;

  const medfieldTableProps: MedfieldTableProps = {
    unitNames: [selectedTreatmentUnits[0]],
    context: "caregiver",
    type: "ind",
    treatmentYear: lastYear,
  };

  // State logic for ind or dg in medfieldtable
  const [dataQualityMedfieldtable, setDataQualityMedfieldtable] =
    React.useState(false);
  const [
    dataQualityLowlevelIndicatorlist,
    setDataQualityLowlevelIndicatorList,
  ] = React.useState(false);

  if (dataQualityMedfieldtable) {
    medfieldTableProps.type = "dg";
  } else {
    medfieldTableProps.type = "ind";
  }

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

  const boxMaxHeight = 800;

  const titleStyle = { marginTop: 20, marginLeft: 20 };
  const textMargin = 20;

  const maxWidth = "xxl";
  const titlePadding = 2;

  return (
    <ThemeProvider theme={skdeTheme}>
      <PageWrapper>
        <Header
          bgcolor="surface2.light"
          headerData={headerData}
          breadcrumbs={breadcrumbs}
          maxWidth={maxWidth}
        >
          <ClickAwayListener onClickAway={() => setExpanded(false)}>
            <AccordionWrapper>
              <Accordion
                square={true}
                sx={{
                  width: Math.min(400, 0.8 * width),
                  borderRadius: 11,
                  border: 1,
                  borderColor: skdeTheme.palette.primary.main,
                  backgroundColor: "white",
                  color: skdeTheme.palette.primary.main,
                }}
                expanded={expanded}
                onChange={(e, expanded) => {
                  setExpanded(expanded);
                }}
              >
                <AccordionSummary expandIcon={<CustomAccordionExpandIcon />}>
                  <h3>
                    {selectedTreatmentUnits[0] === "Nasjonalt"
                      ? "Velg behandlingssted"
                      : selectedTreatmentUnits[0]}
                  </h3>
                </AccordionSummary>

                <AccordionDetails>
                  <FilterMenu
                    refreshState={shouldRefreshInitialState}
                    onSelectionChanged={handleChange}
                    onFilterInitialized={initialiseFilter}
                  >
                    <TreeViewFilterSection
                      refreshState={shouldRefreshInitialState}
                      treedata={treatmentUnits.treedata}
                      defaultvalues={treatmentUnits.defaults}
                      initialselections={
                        selectedTreatmentUnits.map((value) => ({
                          value: value,
                          valueLabel: value,
                        })) as FilterSettingsValue[]
                      }
                      sectionid={treatmentUnitsKey}
                      sectiontitle={"Behandlingsenheter"}
                      filterkey={treatmentUnitsKey}
                      searchbox={true}
                      multiselect={false}
                      accordion={false}
                      noShadow={true}
                    />
                  </FilterMenu>
                </AccordionDetails>
              </Accordion>
            </AccordionWrapper>
          </ClickAwayListener>
        </Header>

        <Container maxWidth={maxWidth} disableGutters={true}>
          <Box marginTop={2} className="hospital-profile-box">
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 7 }}>
                <HospitalInfoBox
                  boxHeight={width > breakpoints.xxl ? 350 : 450}
                  unitNames={unitNamesQuery.data}
                  selectedTreatmentUnit={selectedTreatmentUnits[0]}
                  unitUrl={unitUrl}
                  imgSrc={imgSrc}
                  setImgSrc={setImgSrc}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 5 }}>
                <AffiliatedHospitals
                  boxHeight={width > breakpoints.xxl ? 350 : 450}
                  titleStyle={titleStyle}
                  unitNames={unitNamesQuery.data}
                  selectedTreatmentUnit={selectedTreatmentUnits[0]}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <ExpandableItemBox
                  collapsedHeight={boxMaxHeight}
                  collapsedText="Vis flere"
                  expandedText="Vis færre"
                >
                  <Box padding={titlePadding}>
                    <Typography variant="h5" style={titleStyle}>
                      <b>Kvalitetsindikatorer fordelt på fagområder</b>
                    </Typography>
                    <ChipSelection
                      leftChipLabel="Vis kvalitetsindikatorer"
                      rightChipLabel="Vis datakvalitet"
                      leftChipHelpText="Hver indikator er fremstilt som et symbol som viser om indikatoren er høy, middels eller lav måloppnåelse. Du kan også trykke på fagområde for å se hvilke register kvalitetsindikatorene kommer fra."
                      rightChipHelpText="Datakvalitet representerer for eksempel dekningsgrad som angir andel pasienter eller hendelser som registreres, i forhold til antall som skal registreres i registeret fra behandlingsstedet. Hver indikator er fremstilt som et symbol som viser om indikatoren er høy, middels eller lav måloppnåelse. Du kan også trykke på fagområde for å se hvilke register datakvaliteten er rapportert fra."
                      hoverBoxOffset={[20, 20]}
                      hoverBoxPlacement="top"
                      hoverBoxMaxWidth={400}
                      state={dataQualityMedfieldtable}
                      stateSetter={setDataQualityMedfieldtable}
                      trueChip="right"
                    />
                    <div style={{ margin: textMargin }}>
                      <Typography variant="body1">
                        {dataQualityMedfieldtable
                          ? "Her vises dekningsgraden eller datakvaliteten til " +
                            selectedTreatmentUnits[0] +
                            " fordelt på fagområder som forteller om datagrunnlaget fra registrene."
                          : "Her vises alle kvalitetsindikatorene fra " +
                            selectedTreatmentUnits[0] +
                            " fordelt på fagområder. Hver indikator er vist som et symbol for høy, middels eller lav måloppnåelse."}
                      </Typography>
                    </div>
                  </Box>

                  <MedfieldTable {...medfieldTableProps} />
                </ExpandableItemBox>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <ExpandableItemBox
                  collapsedHeight={boxMaxHeight}
                  collapsedText="Vis flere"
                  expandedText="Vis færre"
                >
                  <Box padding={titlePadding}>
                    <Typography variant="h5" style={titleStyle}>
                      <b>Siste års måloppnåelse</b>
                    </Typography>
                    <div style={{ margin: textMargin }}>
                      <Typography variant="body1">
                        {"Her er en interaktiv liste som gir oversikt over kvalitetsindikatorene ut fra siste års måloppnåelse for " +
                          unitFullName +
                          ". Du kan trykke på indikatorene for å se mer informasjon om indikatoren og følge oppgitt lenke til mer detaljert beskrivelse av indikatoren."}
                      </Typography>
                    </div>
                    <ChipSelection
                      leftChipLabel="Vis kvalitetsindikatorer"
                      rightChipLabel="Vis datakvalitet"
                      leftChipHelpText="Hver indikator er fremstilt som et symbol som viser om indikatoren er høy, middels eller lav måloppnåelse. Du kan også trykke på fagområde for å se hvilke register kvalitetsindikatorene kommer fra."
                      rightChipHelpText="Datakvalitet representerer for eksempel dekningsgrad som angir andel pasienter eller hendelser som registreres, i forhold til antall som skal registreres i registeret fra behandlingsstedet. Hver indikator er fremstilt som et symbol som viser om indikatoren er høy, middels eller lav måloppnåelse. Du kan også trykke på fagområde for å se hvilke register datakvaliteten er rapportert fra."
                      hoverBoxOffset={[20, 20]}
                      hoverBoxPlacement="top"
                      hoverBoxMaxWidth={400}
                      state={dataQualityLowlevelIndicatorlist}
                      stateSetter={setDataQualityLowlevelIndicatorList}
                      trueChip="right"
                    />
                  </Box>

                  <LowLevelIndicatorList
                    context={"caregiver"}
                    type={dataQualityLowlevelIndicatorlist ? "dg" : "ind"}
                    unitNames={[selectedTreatmentUnits[0] || "Nasjonalt"]}
                    year={lastYear}
                  />
                </ExpandableItemBox>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <HospitalProfileLinePlot
                  unitFullName={unitFullName}
                  unitNames={selectedTreatmentUnits[0]}
                  lastYear={lastYear}
                  pastYears={pastYears}
                  titlePadding={titlePadding}
                  titleStyle={titleStyle}
                  textMargin={textMargin}
                />
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

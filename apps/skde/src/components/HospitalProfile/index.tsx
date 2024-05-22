import { NavigateNextRounded } from "@mui/icons-material";
import { Breadcrumbs, Link, Toolbar, Typography, styled } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import { getTreatmentUnitsTree } from "qmongjs/src/components/FilterMenu/TreatmentQualityFilterMenu/filterMenuOptions";
import { UseQueryResult } from "@tanstack/react-query";
import { useUnitNamesQuery } from "qmongjs";
import { TreeViewFilterSection } from "qmongjs/src/components/FilterMenu/TreeViewFilterSection";
import { useQueryParam } from "use-query-params";
import { DelimitedArrayParam } from "use-query-params";
import { withDefault } from "use-query-params";
import { FilterSettingsValue } from "qmongjs";

const StyledToolbarTop = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
}));

const LogoImage = styled("img")(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    height: 40,
    width: 100,
  },
  [theme.breakpoints.up("lg")]: {
    height: 50,
    width: 125,
  },
}));

const StyledBreadcrumbSeparator = styled(NavigateNextRounded)(({ theme }) => ({
  color: theme.palette.primary.light,
}));

const SkdeBreadcrumbs = () => {
  return (
    <Breadcrumbs
      separator={<StyledBreadcrumbSeparator fontSize="large" />}
      aria-label="breadcrumb"
    >
      <Link
        underline="hover"
        key="1"
        color="inherit"
        href="https://www.skde.no"
      >
        Forside
      </Link>
      <Typography key="3" color="text.primary">
        Sykehusprofil
      </Typography>
    </Breadcrumbs>
  );
};

const HeaderTop = () => {
  return (
    <StyledToolbarTop className="header-top">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <LogoImage src="/img/logos/skde-blue.png" alt="SKDE logo" />
        </Grid>
        <Grid xs={12}>
          <SkdeBreadcrumbs />
        </Grid>
      </Grid>
    </StyledToolbarTop>
  );
};

const StyledToolbarMiddle = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.hospitalProfileHeader.light,
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(8),
}));

const HeaderMiddle = () => {
  return (
    <StyledToolbarMiddle className="header-middle">
      <Grid container spacing={2} rowSpacing={6}>
        <Grid xs={12}>
          <Typography variant="h1">Sykehusprofil</Typography>
        </Grid>
        <Grid xs={12}>
          <Typography variant="h6">Resultater fra sykehus</Typography>
        </Grid>
      </Grid>
    </StyledToolbarMiddle>
  );
};

export const Header = () => {
  return (
    <React.Fragment>
      <HeaderTop />
      <HeaderMiddle />
    </React.Fragment>
  );
};

export const TreatmentUnitSelector = () => {
  const treatmentUnitsKey = "selected_treatment_units";

  const [selectedTreatmentUnits, setSelectedTreatmentUnits] = useQueryParam(
    treatmentUnitsKey,
    withDefault(DelimitedArrayParam, ["Nasjonalt"]),
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unitNamesQuery: UseQueryResult<any, unknown> = useUnitNamesQuery(
    "all",
    "caregiver",
    "ind",
  );

  const treatmentUnits = getTreatmentUnitsTree(unitNamesQuery);

  return (
    <TreeViewFilterSection
      refreshState={false}
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
      maxselections={1}
    />
  );
};

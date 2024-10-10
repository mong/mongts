import React, { useState } from "react";
import {
  QualityAtlasFigure,
  useMedicalFieldsQuery,
  useUnitNamesQuery,
  useRegisterNamesQuery,
} from "qmongjs";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { InputLabel } from "@mui/material";
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Button,
  ThemeProvider,
} from "@mui/material";
import { FilterDrawer } from "../../src/components/TreatmentQuality";
import { ChevronLeftRounded } from "@mui/icons-material";
import { TreatmentQualityFilterMenu } from "qmongjs";
import { skdeTheme } from "qmongjs";
import { BreadCrumbPath } from "../../src/components/Header";
import { Header, HeaderData } from "../../src/components/Header";

const width = 1000;
const minBoxWidth = 40;
const maxBoxWidth = 100;
const gap = 2;
const context = "caregiver";
const currentYear = new Date().getFullYear();
const numberOfYears = 5;
const selectYearOptions = Array.from(
  { length: numberOfYears },
  (_, i) => i + currentYear - numberOfYears,
);

// Header settings
const breadcrumbs: BreadCrumbPath = {
  path: [
    {
      link: "https://www.skde.no",
      text: "Forside",
    },
    {
      link: "https://www.skde.no/resultater",
      text: "Tall om helsetjenesten",
    },
    {
      link: "/varmekart/",
      text: "Varmekart",
    },
  ],
};

const headerData: HeaderData = {
  title: "Varmekart",
  subtitle:
    "Her vises alle kvalitetsindikatorer fra nasjonale medisinske kvalitetsregistre i et varmekart",
};

export const Skde = (): JSX.Element => {
  const [year, setYear] = useState((currentYear - 1).toString());
  const [unitLevel, setUnitLevel] = useState("RHF");
  const [medField, setMedField] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => {
    setDrawerOpen(newOpen);
  };

  const handleChangeYear = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };

  const handleChangeUnitLevel = (event: SelectChangeEvent) => {
    setUnitLevel(event.target.value as string);
  };

  const handleChangeMedField = (event: SelectChangeEvent) => {
    setMedField(event.target.value as string);
  };

  const medfieldsQuery = useMedicalFieldsQuery();
  const unitNamesQuery = useUnitNamesQuery("all", "caregiver", "ind");
  const registryNameQuery = useRegisterNamesQuery();

  if (
    unitNamesQuery.isFetching ||
    medfieldsQuery.isFetching ||
    registryNameQuery.isFetching
  ) {
    return null;
  }

  const nestedUnitNames = unitNamesQuery.data.nestedUnitNames;

  const RHFs = nestedUnitNames
    .map((row) => row.rhf)
    .filter((row) => !row.includes("Private"));

  const HFs = nestedUnitNames
    .filter((row) => !row.rhf.includes("Private"))
    .map((row) => {
      return row.hf.map((hf) => hf.hf);
    })
    .flat()
    .filter((row) => !row.includes("Private"));

  const hospitals = nestedUnitNames
    .filter((row) => !row.rhf.includes("Private"))
    .map((rhf) => {
      return rhf.hf
        .filter((hf) => !hf.hf.includes("Private"))
        .map((hf) => {
          return hf.hospital;
        })
        .flat();
    })
    .flat();

  let unitNames;

  switch (unitLevel) {
    case "RHF": {
      unitNames = RHFs;
      break;
    }
    case "HF": {
      unitNames = HFs;
      break;
    }
    case "Sykehus": {
      unitNames = hospitals;
      break;
    }
    default: {
      unitNames = RHFs;
    }
  }

  const indicatorIDs = [
    "colon_relsurv_fra_opr",
    "hjerneslag_beh_tromb",
    "breast_bct_invasiv_0_30mm",
    "Lungekreft_AndelLobektomiThorakoskopisk",
    "NDV_andel_HbA1C_mindre_eller_lik_53",
    "rectum_laparoskopi",
    "prostata_utfoert_lymfadenektomi",
    "hoftebrudd_stammefiks",
    "prostata_fri_reseksjonsmargin",
    "norkar_forsnev_hals_14d",
    "rectum_lokalt_tilbakefall",
    "NDV_andel_HbA1C_mindre_eller_lik_75",
    "breast_bct_dcis_0_20mm",
    "nyre_hemodia_ktv",
    "colon_laparoskopi",
    "hjerteinfarkt_invasivt_nstemi_72t",
    "barnediabetes_hba1c_lt_7",
    "hoftebrudd_ventetid48",
    "lungekreft_postoperativmortalitet30dager",
    "barnediabetes_hba1c_ge_9",
    "hjerteinfarkt_reper_stemi",
    "nyre_dialyse_hjemme",
    "noric_trykkmaaling",
    "nyre_transplant_bt",
  ];

  return (
    <ThemeProvider theme={skdeTheme}>
      <Header
        bgcolor="surface2.light"
        headerData={headerData}
        breadcrumbs={breadcrumbs}
        maxWidth={false}
      />
      <div style={{ margin: 40, display: "flex", flexDirection: "row" }}>
        <Button
          variant="contained"
          onClick={() => setDrawerOpen(true)}
          sx={{ marginRight: 10 }}
        >
          Åpne filtermeny{" "}
        </Button>
        <Box width={100}>
          <FormControl fullWidth>
            <InputLabel id="year-input-label">År</InputLabel>
            <Select
              labelId="year-input-label"
              id="year-input"
              value={year}
              label="Year"
              onChange={handleChangeYear}
            >
              {selectYearOptions.map((year) => {
                return (
                  <MenuItem key={year.toString()} value={year}>
                    {year.toString()}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>

        <Box width={50} />

        <Box width={250}>
          <FormControl fullWidth>
            <InputLabel id="unitlevel-input-label">Enhetsnivå</InputLabel>
            <Select
              labelId="unitlevel-input-label"
              id="unitlevel-input"
              value={unitLevel}
              label="Unit level"
              onChange={handleChangeUnitLevel}
            >
              <MenuItem key={"RHF"} value={"RHF"}>
                Regionale helseforetak
              </MenuItem>
              <MenuItem key={"HF"} value={"HF"}>
                Helseforetak
              </MenuItem>
              <MenuItem key={"Sykehus"} value={"Sykehus"}>
                Sykehus
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box width={50} />

        <Box width={250}>
          <FormControl fullWidth>
            <InputLabel id="medfield-input-label">Fagområder</InputLabel>
            <Select
              labelId="medfield-input-label"
              id="medifield-input"
              value={medField}
              label="Medical field"
              onChange={handleChangeMedField}
            >
              <MenuItem key="custom" value={""}>
                Egendefinerte indikatorer
              </MenuItem>
              {medfieldsQuery.data.map((row) => {
                return (
                  <MenuItem key={row.shortName} value={row.shortName}>
                    {row.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </div>

      <QualityAtlasFigure
        width={width}
        minBoxWidth={minBoxWidth}
        maxBoxWidth={maxBoxWidth}
        gap={gap}
        context={context}
        year={Number(year)}
        indicatorIDs={indicatorIDs}
        medField={medField}
        unitNames={unitNames}
      />

      <FilterDrawer
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Box sx={{ display: "flex", m: 2, justifyContent: "space-between" }}>
          <Typography variant="h3">Filtermeny</Typography>
          <IconButton
            aria-label="Lukk sidemeny"
            onClick={() => toggleDrawer(false)}
          >
            <ChevronLeftRounded fontSize="large" />
          </IconButton>
        </Box>
        <Divider />
        <TreatmentQualityFilterMenu
          onSelectionChanged={() => {}}
          onFilterInitialized={() => {}}
          registryNameData={registryNameQuery.data}
          medicalFieldData={medfieldsQuery.data}
          context={"caregiver"}
          page={"heatmap"}
        />
      </FilterDrawer>
    </ThemeProvider>
  );
};

export default Skde;

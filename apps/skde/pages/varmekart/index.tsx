import React from "react";
import { QualityAtlasFigure, useMedicalFieldsQuery } from "qmongjs";
import { useUnitNamesQuery } from "qmongjs";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { InputLabel } from "@mui/material";
import Box from "@mui/material/Box";

const width = 1000;
const maxBoxWidth = 100;
const gap = 2;
const context = "caregiver";
const currentYear = new Date().getFullYear();
const numberOfYears = 5;
const selectYearOptions = Array.from(
  { length: numberOfYears },
  (_, i) => i + currentYear - numberOfYears,
);

export const Skde = (): JSX.Element => {
  const [year, setYear] = React.useState((currentYear - 1).toString());
  const [unitLevel, setUnitLevel] = React.useState("RHF");
  const [medField, setMedField] = React.useState("");

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

  if (unitNamesQuery.isFetching || medfieldsQuery.isFetching) {
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
    <div>
      <div style={{ margin: 40, display: "flex", flexDirection: "row" }}>
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

      <div>
        <QualityAtlasFigure
          width={width}
          maxBoxWidth={maxBoxWidth}
          gap={gap}
          context={context}
          year={Number(year)}
          indicatorIDs={indicatorIDs}
          medField={medField}
          unitNames={unitNames}
        />
      </div>
    </div>
  );
};

export default Skde;

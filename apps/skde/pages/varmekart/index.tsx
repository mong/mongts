import React from "react";
import { QualityAtlasFigure } from "qmongjs";
import { useUnitNamesQuery } from "qmongjs";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { InputLabel } from "@mui/material";
import Box from "@mui/material/Box";

const width = 1000;
const gap = 2;
const context = "caregiver";

export const Skde = (): JSX.Element => {
  const [year, setYear] = React.useState("2020");
  const [unitLevel, setUnitLevel] = React.useState("RHF");

  const handleChangeYear = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };

  const handleChangeUnitLevel = (event: SelectChangeEvent) => {
    setUnitLevel(event.target.value as string);
  };

  const unitNamesQuery = useUnitNamesQuery("all", "caregiver", "ind");

  if (unitNamesQuery.isFetching) {
    return null;
  }

  const nestedUnitNames = unitNamesQuery.data.nestedUnitNames;

  const RHFs = nestedUnitNames.map((row) => row.rhf);

  const HFs = nestedUnitNames
    .map((row) => {
      return row.hf.map((hf) => hf.hf);
    })
    .flat();

  const hospitals = nestedUnitNames
    .map((row) => {
      return row.hf
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
        <Box width={70}>
          <FormControl fullWidth>
            <InputLabel id="year-input-label">År</InputLabel>
            <Select
              labelId="year-input-label"
              id="year-input"
              value={year}
              label="Year"
              onChange={handleChangeYear}
            >
              <MenuItem value={2020}>2020</MenuItem>
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box width={50} />
        <Box width={200}>
          <FormControl fullWidth>
            <InputLabel id="unitlevel-input-label">Enhetsnivå</InputLabel>
            <Select
              labelId="unitlevel-input-label"
              id="unilevel-input"
              value={unitLevel}
              label="Unit level"
              onChange={handleChangeUnitLevel}
            >
              <MenuItem value={"RHF"}>Regionale helseforetak</MenuItem>
              <MenuItem value={"HF"}>Helseforetak</MenuItem>
              <MenuItem value={"Sykehus"}>Sykehus</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <QualityAtlasFigure
        width={width}
        gap={gap}
        context={context}
        year={Number(year)}
        indicatorIDs={indicatorIDs}
        unitNames={unitNames}
      />
    </div>
  );
};

export default Skde;

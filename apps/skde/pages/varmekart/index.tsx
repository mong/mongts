import React from "react";
import { HeatMap, HeatMapColumn, createHeatmapData } from "../../src/charts/HeatMap";
import { UseQueryResult } from "@tanstack/react-query";
import { FetchIndicatorParams } from "qmongjs/src/helpers/hooks";
import { useIndicatorQuery } from "qmongjs/src/helpers/hooks";
import { Indicator } from "types";

const width = 600;
const gap = 10;

const binData: HeatMapColumn[] = [
  {
    bin: 0,
    bins: [
      { bin: 0, count: 1 },
      { bin: 1, count: 2 },
      { bin: 2, count: 1 },
      { bin: 3, count: 2 },
    ],
  },
  {
    bin: 1,
    bins: [
      { bin: 0, count: 0 },
      { bin: 1, count: 2 },
      { bin: 2, count: 1 },
      { bin: 3, count: 2 },
    ],
  },
  {
    bin: 2,
    bins: [
      { bin: 0, count: 0 },
      { bin: 1, count: 1 },
      { bin: 2, count: 0 },
      { bin: 3, count: 0 },
    ],
  },
  {
    bin: 3,
    bins: [
      { bin: 0, count: 0 },
      { bin: 1, count: 2 },
      { bin: 2, count: 2 },
      { bin: 3, count: 2 },
    ],
  },
  {
    bin: 4,
    bins: [
      { bin: 0, count: 0 },
      { bin: 1, count: 2 },
      { bin: 2, count: 1 },
      { bin: 3, count: 2 },
    ],
  },
];

const queryParams: FetchIndicatorParams = {
  context: "caregiver",
  unitNames: ["Helse Nord RHF", "Helse Midt-Norge RHF", "Helse Vest RHF", "Helse Sør-Øst RHF"],
  type: "ind",
};


export const Skde = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const indicatorQuery: UseQueryResult<any, unknown> =
  useIndicatorQuery(queryParams);

  if (indicatorQuery.isFetching) {
  return null;
  }

  const indIDs = [
    "colon_relsurv_fra_opr",
    "hjerneslag_beh_tromb",
    "breast_bct_invasiv_0_30mm",
    "lungekreft_andellobektomithoraskopisk",
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

  const indicatorData = indicatorQuery.data as Indicator[];


  const data = createHeatmapData(indicatorData.filter((row) => {
    return(indIDs.includes(row.ind_id))
  }))

  return (
    <div>
      <HeatMap data={data} width={width} separation={gap}></HeatMap>
    </div>
  );
};

export default Skde;

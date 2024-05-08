import React from "react";
import { HeatMap, createHeatmapData } from "qmongjs";
import { UseQueryResult } from "@tanstack/react-query";
import { FetchIndicatorParams } from "qmongjs/src/helpers/hooks";
import { useIndicatorQuery } from "qmongjs/src/helpers/hooks";
import { Indicator } from "types";

const width = 2000;
const gap = 2;

export const Skde = (): JSX.Element => {
  const unitNames = [
    "Helse Nord RHF",
    "Helse Midt-Norge RHF",
    "Helse Vest RHF",
    "Helse Sør-Øst RHF",
  ];

  const queryParams: FetchIndicatorParams = {
    context: "caregiver",
    treatmentYear: 2021,
    unitNames: unitNames,
    type: "ind",
  };

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

  const indicatorData = indicatorQuery.data as Indicator[];

  const filteredData = indicatorData.filter((row) => {
    return indIDs.includes(row.ind_id);
  });

  const indNameKey = filteredData.map((row) => {
    return { indID: row.ind_id, indTitle: row.ind_title };
  });

  const data = createHeatmapData(filteredData, unitNames, indIDs);

  return (
    <div style={{ margin: 40 }}>
      <div>
        <HeatMap heatmapData={data} width={width} separation={gap}></HeatMap>
      </div>
      <div>
        <h3>Indikatorer</h3>
        <ol>
          {indIDs.map((indIDRow, index) => {
            const indName = indNameKey.find((indKeyRow) => {
              return indKeyRow.indID === indIDRow;
            });
            return indName ? (
              <li key={"ind-" + index}>{indName.indTitle}</li>
            ) : null;
          })}
        </ol>
      </div>
    </div>
  );
};

export default Skde;

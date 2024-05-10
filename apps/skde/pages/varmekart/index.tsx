import React from "react";
import { QualityAtlasFigure } from "qmongjs";

const width = 2000;
const gap = 2;
const year = 2021;
const context = "caregiver";

export const Skde = (): JSX.Element => {
  const unitNames = [
    "Helse Nord RHF",
    "Helse Midt-Norge RHF",
    "Helse Vest RHF",
    "Helse Sør-Øst RHF",
  ];

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
    <QualityAtlasFigure
      width={width}
      gap={gap}
      context={context}
      year={year}
      indicatorIDs={indicatorIDs}
      unitNames={unitNames}
    />
  );
};

export default Skde;

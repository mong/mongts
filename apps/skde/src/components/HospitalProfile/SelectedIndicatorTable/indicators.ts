const commonIndicators = ["hjerteinfarkt_reper_stemi_tid",
  "hjerneslag_beh_tromb",
  "hjerneslag_rapport_3mnd",
  "NDV_andel_HbA1C_stoerre_eller_lik_75",
	"hoftebrudd_ventetid48",
  "hoftebrudd_stammefiks",
]

export const indicatorsPerHospital = [
  {unit: "Kirkenes", commonInd: commonIndicators, specificInd: ["hjerneslag_test_svelg", "hjerteinfarkt_invasivt_nstemi", "nyre_transplant_bt"]},
  {unit: "Hammerfest", commonInd: commonIndicators, specificInd: []},
  {unit: "Tromsø", commonInd: commonIndicators, specificInd: []},
  {unit: "Harstad", commonInd: commonIndicators, specificInd: ["nger_kompl_intra_hys", "norgast_lekkasje_tykktarm", "norgast_saarruptur"]},
  {unit: "Narvik", commonInd: commonIndicators, specificInd: [] },
  {unit: "Vesterålen", commonInd: commonIndicators, specificInd: ["hjerneslag_test_svelg", "hjerteinfarkt_ef_maalt"] },
  {unit: "Bodø", commonInd: commonIndicators, specificInd: ["NDV_andel_oppnaadd_kolesterolmaal_med_hjertekarsykdom", "norgast_lekkasje_tykktarm", "nger_kompl_intra_hys"] },
  {unit: "Lofoten", commonInd: commonIndicators, specificInd: ["hjerteinfarkt_ef_maalt"] },
  {unit: "Mo i Rana", commonInd: commonIndicators, specificInd: [] },
  {unit: "Mosjøen", commonInd: commonIndicators, specificInd: ["NDV_andel_HbA1C_mindre_eller_lik_53"] },
  {unit: "Sandnessjøen", commonInd: commonIndicators, specificInd: ["hjerneslag_tverrfaglig"] },
]

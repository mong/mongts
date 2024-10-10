import React, { useState } from "react";
import { Typography, Button, ThemeProvider } from "@mui/material";
import {
  QualityAtlasFigure,
  useRegisterNamesQuery,
  defaultYear,
  useMedicalFieldsQuery,
  skdeTheme,
  useUnitNamesQuery,
} from "qmongjs";
import { BreadCrumbPath } from "../../src/components/Header";
import { Header, HeaderData } from "../../src/components/Header";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { HeatMapFilterMenu } from "../../src/components/HeatMap/HeatMapFilterMenu";
import { RegisterName, Medfield, NestedTreatmentUnitName } from "types";

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

export const Skde = (): JSX.Element => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [selectedMedicalFields, setSelectedMedicalFields] = useState<string[]>(
    [],
  );
  const [selectedTreatmentUnits, setSelectedTreatmentUnits] = useState([
    "Nasjonalt",
  ]);

  const toggleDrawer = (newOpen: boolean) => {
    setDrawerOpen(newOpen);
  };

  // ########################### //
  // ##### Page parameters ##### //
  // ########################### //

  const width = 1000;
  const minBoxWidth = 30;
  const maxBoxWidth = 75;
  const gap = 2;
  const context = "caregiver";

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

  // ################### //
  // ##### Queries ##### //
  // ################### //

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

  const registers = registryNameQuery.data as RegisterName[];
  const medicalFields = medfieldsQuery.data as Medfield[];
  const nestedUnitNames = unitNamesQuery.data
    ?.nestedUnitNames as NestedTreatmentUnitName[];

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

  // Button
  // This button sets the new unit name and updates the URL query parameter "selected_treatment_unit"
  const SelectRHFButton = (props: {
    buttonVariant: "outlined" | "text" | "contained";
    setSelectedTreatmentUnits: React.Dispatch<React.SetStateAction<string[]>>;
  }) => {
    const { buttonVariant, setSelectedTreatmentUnits } = props;

    // Router for updating the query parameter
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const params = new URLSearchParams(searchParams.toString());
    params.set("selected_treatment_units", RHFs.join("_"));

    return (
      <Button
        onClick={() => {
          router.replace(pathname + "?" + params.toString(), { scroll: false });
          setSelectedTreatmentUnits(RHFs);
        }}
        variant={buttonVariant}
      >
        <Typography variant="button">Velg alle RHF</Typography>
      </Button>
    );
  };

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
          Åpne filtermeny
        </Button>
        <SelectRHFButton
          buttonVariant="outlined"
          setSelectedTreatmentUnits={setSelectedTreatmentUnits}
        />
      </div>

      <QualityAtlasFigure
        width={width}
        minBoxWidth={minBoxWidth}
        maxBoxWidth={maxBoxWidth}
        gap={gap}
        context={context}
        year={selectedYear}
        indicatorIDs={indicatorIDs}
        medField={selectedMedicalFields}
        unitNames={selectedTreatmentUnits}
      />

      <HeatMapFilterMenu
        registryNameData={registers}
        medicalFieldData={medicalFields}
        context={context}
        page="heatmap"
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        setSelectedYear={setSelectedYear}
        setSelectedMedicalFields={setSelectedMedicalFields}
        setSelectedTreatmentUnits={setSelectedTreatmentUnits}
      />
    </ThemeProvider>
  );
};

export default Skde;

import React, { useState } from "react";
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
import {
  QualityAtlasFigure,
  FilterSettingsAction,
  FilterSettingsValue,
  TreatmentQualityFilterMenu,
  decodeRegisterQueryParam,
  useRegisterNamesQuery,
  defaultYear,
  treatmentUnitsKey,
  yearKey,
  medicalFieldKey,
  useMedicalFieldsQuery,
  FilterSettingsActionType,
  skdeTheme,
  useUnitNamesQuery,
} from "qmongjs";
import { BreadCrumbPath } from "../../src/components/Header";
import { Header, HeaderData } from "../../src/components/Header";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

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

  const registers = registryNameQuery.data;
  const medicalFields = medfieldsQuery.data;
  const nestedUnitNames = unitNamesQuery.data?.nestedUnitNames;

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

  // ######################################## //
  // ##### Copy-paste filter meny stuff ##### //
  // ######################################## //

  /**
   * Get the register names for the selected medical fields and registers
   *
   * @param medicalFieldFilter Array of medical field and register names
   * @returns Array of register names
   */
  const getMedicalFieldFilterRegisters = (medicalFieldFilter: string[]) => {
    let registerFilter: string[];

    if (!medicalFieldFilter || medicalFieldFilter[0] === "all") {
      registerFilter = registers.map((register) => register.rname);
    } else {
      const selectedMedicalFields = medicalFields.filter((field) =>
        medicalFieldFilter.includes(field.shortName),
      );
      const selectedMedicalFieldNames = selectedMedicalFields.map(
        (field) => field.shortName,
      );
      const selectedRegisters = medicalFieldFilter.filter(
        (name) => !selectedMedicalFieldNames.includes(name),
      );
      registerFilter = Array.from(
        new Set<string>([
          ...selectedMedicalFields.flatMap((field) => field.registers),
          ...selectedRegisters.map((register) =>
            decodeRegisterQueryParam(register),
          ),
        ]),
      );
    }

    return registerFilter;
  };

  /**
   * Handle that the initial filter settings are loaded, which can happen
   * more than once due to Next's pre-rendering and hydration behaviour combined
   * with reading of query params.
   *
   * @param filterSettings Initial values for the filter settings
   */
  const handleFilterInitialized = (
    filterSettings: Map<string, FilterSettingsValue[]>,
  ): void => {
    setSelectedYear(
      parseInt(filterSettings.get(yearKey)[0].value ?? defaultYear.toString()),
    );

    const medicalFieldFilter = filterSettings
      .get(medicalFieldKey)
      ?.map((value) => value.value);

    const registerFilter = getMedicalFieldFilterRegisters(medicalFieldFilter);
    setSelectedMedicalFields(registerFilter);

    setSelectedTreatmentUnits(
      filterSettings.get(treatmentUnitsKey).map((value) => value.value),
    );
  };

  const valueOrDefault = (
    key: string,
    filterSettings: { map: Map<string, FilterSettingsValue[]> },
  ) => {
    switch (key) {
      case yearKey: {
        return (
          filterSettings.map.get(yearKey)[0].value ?? defaultYear.toString()
        );
      }
      case medicalFieldKey: {
        const medicalFieldFilter = filterSettings.map
          .get(medicalFieldKey)
          ?.map((value) => value.value);
        const registerFilter =
          getMedicalFieldFilterRegisters(medicalFieldFilter);
        return registerFilter;
      }
      case treatmentUnitsKey: {
        return filterSettings.map
          .get(treatmentUnitsKey)
          .map((value) => value.value);
      }
      default:
        break;
    }
  };

  const setAllSelected = (newFilterSettings: {
    map: Map<string, FilterSettingsValue[]>;
  }) => {
    setSelectedYear(
      parseInt(valueOrDefault(yearKey, newFilterSettings) as string),
    );
    setSelectedMedicalFields(
      valueOrDefault(medicalFieldKey, newFilterSettings) as string[],
    );
    setSelectedTreatmentUnits(
      valueOrDefault(treatmentUnitsKey, newFilterSettings) as string[],
    );
  };

  /**
   * Handle filter changes
   */
  const handleFilterChanged = (
    newFilterSettings: { map: Map<string, FilterSettingsValue[]> },
    oldFilterSettings: { map: Map<string, FilterSettingsValue[]> },
    action: FilterSettingsAction,
  ): void => {
    switch (action.sectionSetting.key) {
      case yearKey: {
        setSelectedYear(
          parseInt(valueOrDefault(yearKey, newFilterSettings) as string),
        );
        break;
      }
      case medicalFieldKey: {
        setSelectedMedicalFields(
          valueOrDefault(medicalFieldKey, newFilterSettings) as string[],
        );
        break;
      }
      case treatmentUnitsKey: {
        setSelectedTreatmentUnits(
          valueOrDefault(treatmentUnitsKey, newFilterSettings) as string[],
        );
        break;
      }
      default:
        break;
    }

    if (action.type === FilterSettingsActionType.RESET_SELECTIONS) {
      setAllSelected(newFilterSettings);
    }
  };

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
        <SelectRHFButton buttonVariant="outlined" setSelectedTreatmentUnits={setSelectedTreatmentUnits} />
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
          onSelectionChanged={handleFilterChanged}
          onFilterInitialized={handleFilterInitialized}
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

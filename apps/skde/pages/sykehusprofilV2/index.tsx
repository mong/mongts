import {
  Box,
  Button,
  HeroBanner,
  Icon,
  LoadingLogo,
  PageContent,
  RotateDevice,
  ToggleButton,
  ToggleButtonGroup,
} from "@mong/material-ui";
import { Toolbar } from "@mui/material";
import type { UseQueryResult } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import {
  getUnitFullName,
  mainHospitals,
  useUnitNamesQuery,
  useUnitUrlsQuery,
} from "qmongjs";
import { type JSX, Suspense, useEffect, useState } from "react";
import type { NestedTreatmentUnitName, OptsTu } from "types";
import { useQueryParam } from "use-query-params";
import { mainQueryParamsConfig } from "../../src/app_config";
import { TreatmentUnitPopupSingleSelect } from "../../src/components/DialogBox/TreatmentUnitPopupSingleSelect";
import { TopSummarySection } from "../../src/components/HospitalProfile";

export const Skde = (): JSX.Element => {
  // States
  const router = useRouter();
  const [unitName, setUnitName] = useState<(string | null)[] | undefined>([]);
  const [urlCopied, setUrlCopied] = useState<boolean>(false);
  const urlCopiedTimeout = 3000;

  // Grab URL params and setUnitNames on load.
  const searchParams = useSearchParams();
  const urlTreatmentUnits = searchParams?.get("selected_treatment_units");
  useEffect(() => {
    setUnitName([urlTreatmentUnits || ""]);
  }, [urlTreatmentUnits]);

  //Treatment unit popup
  const [treatmentUnitPopupOpen, setTreatmentUnitPopupOpen] = useState(false);
  const [
    selectedTreatmentUnit = [urlTreatmentUnits],
    setSelectedTreatmentUnit,
  ] = useQueryParam<(string | null)[] | undefined>(
    "selected_treatment_units",
    mainQueryParamsConfig.units,
  );

  const treatmentUnitContext = "caregiver";
  const openTreatmentUnitPopup = () => {
    setTreatmentUnitPopupOpen(true);
  };
  const handleClearFilters = () => {
    setSelectedTreatmentUnit([]);
  };

  // ############### //
  // Page parameters //
  // ############### //

  // Years for filtering
  const lastYear = new Date().getFullYear() - 1; // Last year is always the previous year
  const pastYears = 10;

  // ####### //
  // Queries //
  // ####### //

  const unitNamesQuery: UseQueryResult<
    { nestedUnitNames: NestedTreatmentUnitName[]; opts_tu: OptsTu[] },
    Error
  > = useUnitNamesQuery("all", "caregiver", "ind");

  // URLs for the web pages to the different treatment units
  const unitUrlsQuery: UseQueryResult<
    { shortName: string; url: string }[],
    Error
  > = useUnitUrlsQuery();
  const hasUnitsData = !!(unitNamesQuery.data && unitUrlsQuery.data);

  const hasLoadingError =
    unitNamesQuery.status === "error" || unitUrlsQuery.status === "error";
  const isLoading = !router.isReady || !hasUnitsData;
  const selectedUnit = selectedTreatmentUnit[0] ?? null;

  // Keep only main hospitals without mutating query-cache data.
  const nestedUnitNames = (unitNamesQuery.data?.nestedUnitNames ?? []).map(
    (rhf) => ({
      ...rhf,
      hf: rhf.hf.map((hf) => ({
        ...hf,
        hospital: hf.hospital,
      })),
    }),
  );

  const selectedUnitName = unitName?.[0] ?? "";
  const unitFullName = getUnitFullName(nestedUnitNames, selectedUnitName) || "";
  /**
   *  Check if the selected unit exists in the loaded data. Guards against
   *  invalid units coming from the URL.
   **/
  const isValidUnit =
    !!selectedUnit &&
    !!nestedUnitNames.some(
      (tu) =>
        tu.rhf === selectedUnit ||
        tu.hf.some(
          (hf) => hf.hf === selectedUnit || hf.hospital.includes(selectedUnit),
        ),
    );

  const emptyStateClassName =
    "flex flex-col items-center justify-center  text-dark gap-10 min-h-50 md:min-h-100 my-6";
  const selectedUnitNamesAsString = unitName?.toString() || "";

  return (
    <>
      <HeroBanner
        title="Sykehusprofil"
        description="Her vises alle kvalitetsindikatorer fra nasjonale medisinske
            kvalitetsregistre per behandlingssted."
        image="/hero-bg-2.jpg"
      />
      <Suspense
        fallback={
          <Box padded={false} color="transparent" className="p-10">
            <LoadingLogo message="Laster data" />
          </Box>
        }
      >
        {/* Toolbar */}
        <div
          className={`${hasLoadingError || isLoading ? "hidden" : "hidden md:flex"} truncate bg-neutral-0 w-full align-middle justify-center px-6 md:px-12 sticky top-0 z-60 shadow-xs`}
        >
          <div className="flex flex-col w-full h-full max-w-360">
            <Toolbar disableGutters={true}>
              <div className="flex flex-row max-w-360 w-full justify-between items-center pb-2 md:pb-4">
                <div className="flex flex-row md:flex-row gap-2 md:gap-4 flex-wrap">
                  <div className="flex gap-6">
                    <div className="flex flex-col text-small font-semibold text-brand-primary-900">
                      Behandlingssted
                      <Button onClick={openTreatmentUnitPopup}>
                        Velg behandlingssted
                      </Button>
                    </div>
                    <TreatmentUnitPopupSingleSelect
                      open={treatmentUnitPopupOpen}
                      setOpen={setTreatmentUnitPopupOpen}
                      onSubmit={setUnitName}
                      context={treatmentUnitContext}
                      type={"ind"}
                    />
                    <div className="flex flex-col text-small font-semibold text-brand-primary-900">
                      Vis
                      <ToggleButtonGroup
                        onChange={() => {}}
                        orientation="horizontal"
                        value={["måloppnåelse"]}
                      >
                        <ToggleButton
                          aria-label="toggle item1"
                          value="måloppnåelse"
                        >
                          Måloppnåelse
                        </ToggleButton>
                        <ToggleButton
                          aria-label="toggle item2"
                          value="dekningsgrad"
                          disabled
                        >
                          Dekningsgrad
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <div className="flex text-small font-semibold text-brand-primary-900">
                      <Button variant="text" onClick={handleClearFilters}>
                        Tøm filter
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex align-middle justify-center items-center">
                  <div className="flex flex-col text-small font-semibold text-brand-primary-900">
                    <div className="whitespace-nowrap">&nbsp;</div>
                    <Button
                      startIcon={<Icon size="small" symbol="content_copy" />}
                      variant="secondary"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        setUrlCopied(true);
                        setTimeout(() => {
                          setUrlCopied(false);
                        }, urlCopiedTimeout);
                      }}
                    >
                      {urlCopied ? "Link kopiert" : "Kopier denne visningen"}
                    </Button>
                  </div>
                </div>
              </div>
            </Toolbar>
          </div>
        </div>
        {/* End Toolbar */}

        {/* Page Content */}
        <PageContent>
          <div className="flex w-full flex-1 min-h-0">
            {hasLoadingError ? (
              <Box border className={emptyStateClassName}>
                <h4>Feil ved innhenting av data. Prøv igjen.</h4>
                <Button
                  onClick={() => {
                    unitNamesQuery.refetch();
                    unitUrlsQuery.refetch();
                  }}
                >
                  Last på nytt
                </Button>
              </Box>
            ) : isLoading ? (
              <Box padded={false} color="transparent" className="p-10">
                <LoadingLogo message="Laster data" />
              </Box>
            ) : (
              <div className="w-full max-w-360">
                <div className="flex md:hidden flex-col gap-(--spacing-4) p-8 text-brand-primary-600">
                  <RotateDevice message="Innholdet støttes kun på bredere skjermer. Prøv å snu enheten din." />
                </div>

                {!selectedUnit ? (
                  <Box
                    border
                    className={`${emptyStateClassName} hidden md:flex flex-col justify-center`}
                  >
                    <h3 className="text-nowrap">
                      Velg ett behandlingssted du vil se resultater fra
                    </h3>
                    <Button onClick={openTreatmentUnitPopup}>
                      Velg behandlingssted
                    </Button>
                  </Box>
                ) : !isValidUnit ? (
                  <Box
                    border
                    className={`${emptyStateClassName} hidden md:flex flex-col justify-center`}
                  >
                    <h3 className="text-center">
                      {selectedUnit} har ingen data eller ikke et gyldig
                      behandlingssted.
                    </h3>
                    <Button onClick={openTreatmentUnitPopup}>
                      Velg et annet behandlingssted
                    </Button>
                  </Box>
                ) : (
                  <TopSummarySection
                    selectedTreatmentUnit={selectedTreatmentUnit}
                    unitName={selectedUnitNamesAsString}
                    unitFullName={unitFullName}
                    lastYear={lastYear}
                    pastYears={pastYears}
                  />
                )}
              </div>
            )}
          </div>
        </PageContent>
      </Suspense>
    </>
  );
};

export default Skde;

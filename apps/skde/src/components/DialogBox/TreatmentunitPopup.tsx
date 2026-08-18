import { Button, Icon, IconButton } from "@mong/material-ui";
import {
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import type { UseQueryResult } from "@tanstack/react-query";
import { mainQueryParamsConfig, useUnitNamesQuery } from "qmongjs";
import { type Dispatch, type JSX, type SetStateAction, useState } from "react";
import type { NestedTreatmentUnitName } from "types";
import { useQueryParam } from "use-query-params";
import { getTreatmentUnitsTree } from "../FilterMenu/TreatmentQualityFilterMenu/filterMenuOptions";
import { getFilterSettingsValuesMap } from "../FilterMenu/TreeViewFilterSection";
import TreeViewSearchBox from "../FilterMenu/TreeViewSearchBox";
import { LoadingComponent } from "../Placeholders/LoadingComponent/LoadingComponent";
import { columnColour1, columnColour2, columnColour3 } from "./styles";

type TreatmentUnitPopupProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: Dispatch<SetStateAction<(string | null)[] | undefined>>;
  context: string;
  type: string;
};

export const TreatmentUnitPopup = (props: TreatmentUnitPopupProps) => {
  const { open, setOpen, onSubmit, context, type } = props;

  const [highlightedRHF, setHighlightedRHF] = useState<string>("");
  const [highlightedHF, setHighlightedHF] = useState<string>("");

  const [unitSelection = ["Nasjonalt"], setUnitSelection] = useQueryParam<
    string[] | undefined,
    string[]
    // @ts-expect-error - Ignored to pass ci checks, but should be fixed properly in the future
  >("units", mainQueryParamsConfig.units);

  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  const unitNamesQuery: UseQueryResult<any, unknown> = useUnitNamesQuery(
    "all",
    context,
    type,
  );

  // Sort nested unit names by RHF
  const unitNames = unitNamesQuery.data?.nestedUnitNames.sort(
    (a: NestedTreatmentUnitName, b: NestedTreatmentUnitName) => {
      return a.rhf_sort - b.rhf_sort;
    },
  );

  const treatmentUnitsTree = getTreatmentUnitsTree(unitNamesQuery);
  const treatmentUnitsValueMap = getFilterSettingsValuesMap(
    treatmentUnitsTree.treedata,
  );

  // ####################################### //
  // Map RHFs and return checkbox components //
  // ####################################### //

  const RHFCheckboxes =
    unitNames &&
    (unitNames.map((rhf: NestedTreatmentUnitName) => {
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Add RHF to the selection
        if (event.target.checked) {
          // May contain duplicates
          const newRHFSelection = [...unitSelection, rhf.rhf];

          setUnitSelection([...new Set(newRHFSelection)]);
        } else {
          const newRHFSelection = [...unitSelection].filter((row) => {
            return row !== rhf.rhf;
          });
          setUnitSelection([...new Set(newRHFSelection)]);
        }
      };
      // Check if at least one subunit is checked.
      // The RHF checkbox should then be indeterminate.
      const hfChecked = () => {
        const selectedSet = new Set([...unitSelection]);
        const hfSet = new Set(rhf.hf.map((el) => el.hf));
        return selectedSet.intersection(hfSet).size > 0;
      };

      const hospitalsChecked = () => {
        const selectedSet = new Set([...unitSelection]);
        const hospitals = rhf.hf.flatMap((hf) => {
          return hf.hospital;
        });

        const hospitalSet = new Set([...hospitals]);
        return selectedSet.intersection(hospitalSet).size > 0;
      };

      return (
        <FormControlLabel
          label={rhf.rhf}
          key={rhf.rhf}
          onClick={(event) => {
            // If the user clicks on the label
            // the checkbox should not be checked.
            // Only the highlighted RHF should
            // be changed.
            const child = document.getElementById(`${rhf.rhf}_checkbox`);

            if (event.target !== child) {
              event.preventDefault();
            }

            setHighlightedRHF(rhf.rhf);
            setHighlightedHF("");
          }}
          sx={{
            width: "100%",
            margin: "0px",
            paddingLeft: "20px",
            paddingRight: "10px",
            background:
              highlightedRHF === rhf.rhf ? columnColour2 : columnColour1,
            display: "flex",
            alignItems: "center",
            minWidth: 0,
            "& .MuiFormControlLabel-label": {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: 1,
              minWidth: 0,
            },
          }}
          control={
            <Checkbox
              id={`${rhf.rhf}_checkbox`}
              checked={unitSelection.includes(rhf.rhf)}
              indeterminate={
                !unitSelection.includes(rhf.rhf) &&
                (hfChecked() || hospitalsChecked())
              }
              onChange={handleChange}
              key={`${rhf.rhf}_checkbox`}
              sx={{
                color: "var(--brand-primary-400)",
                flexShrink: 0,
              }}
            />
          }
        />
      );
    }) as JSX.Element[]);

  // #################################################### //
  // Map HFs and hospitals and return checkbox components //
  // #################################################### //

  const HFCheckBoxes: Record<string, JSX.Element[]> = {};
  const HospitalCheckBoxes: Record<string, JSX.Element[]> = {};

  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  unitNames &&
    // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
    unitNames.map((unitName: NestedTreatmentUnitName) => {
      const hfs = unitName.hf.sort((a, b) => {
        return a.hf_sort - b.hf_sort;
      });

      // ######################### //
      // ##### Map hospitals ##### ∕∕
      // ######################### //
      // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
      hfs.map((hf) => {
        const CheckBoxes = hf.hospital.map((hospital) => {
          const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.checked) {
              const newUnitSelection = [...unitSelection, hospital];
              setUnitSelection([...newUnitSelection]);
            } else {
              const newUnitSelection = [
                ...unitSelection.filter((row) => {
                  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
                  return row != hospital;
                }),
              ];
              setUnitSelection(newUnitSelection);
            }
          };
          return (
            <FormControlLabel
              label={hospital}
              key={hospital}
              sx={{
                width: "100%",
                margin: "0px",
                paddingLeft: "20px",
                paddingRight: "10px",
                background: columnColour3,
                display: "flex",
                alignItems: "center",
                minWidth: 0,
                "& .MuiFormControlLabel-label": {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  flex: 1,
                  minWidth: 0,
                },
              }}
              control={
                <Checkbox
                  checked={unitSelection.includes(hospital)}
                  onChange={handleChange}
                  key={`${hospital}_checkbox`}
                  sx={{
                    color: "var(--brand-primary-400)",
                    flexShrink: 0,
                  }}
                />
              }
            />
          );
        });
        HospitalCheckBoxes[hf.hf] = CheckBoxes;
      });

      // ################### //
      // ##### Map HFs ##### ∕∕
      // ################### //
      const CheckBoxes = hfs.map((hf) => {
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.checked) {
            const newHFSelection = [...unitSelection, hf.hf];
            setUnitSelection([...newHFSelection]);
          } else {
            const newHFSelection = [
              ...unitSelection.filter((row) => {
                // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
                return row != hf.hf;
              }),
            ];
            setUnitSelection(newHFSelection);
          }
        };

        // Check if at least one hospital is checked.
        // The correspinding HF checkbox should then be indeterminate.
        const hospitalChecked = () => {
          const selectedSet = new Set([...unitSelection]);
          const hospitalSet = new Set([...hf.hospital]);
          return selectedSet.intersection(hospitalSet).size > 0;
        };

        return (
          <FormControlLabel
            label={hf.hf}
            key={hf.hf}
            onClick={(event) => {
              // If the user clicks on the label
              // the checkbox should not be checked.
              // Only the highlighted HF should
              // be changed.
              const child = document.getElementById(`${hf.hf}_checkbox`);

              if (event.target !== child) {
                event.preventDefault();
              }
              setHighlightedHF(hf.hf);
            }}
            sx={{
              width: "100%",
              margin: "0px",
              paddingLeft: "20px",
              paddingRight: "10px",
              background:
                highlightedHF === hf.hf ? columnColour3 : columnColour2,
              display: "flex",
              alignItems: "center",
              minWidth: 0,
              "& .MuiFormControlLabel-label": {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
                minWidth: 0,
              },
            }}
            control={
              <Checkbox
                id={`${hf.hf}_checkbox`}
                checked={unitSelection.includes(hf.hf)}
                indeterminate={
                  !unitSelection.includes(hf.hf) && hospitalChecked()
                }
                onChange={handleChange}
                key={`${hf.hf}_checkbox`}
                sx={{
                  color: "var(--brand-primary-400)",
                  flexShrink: 0,
                }}
              />
            }
          />
        );
      });
      HFCheckBoxes[unitName.rhf] = CheckBoxes;
    });

  const handleClose = () => {
    setOpen(false);
    setHighlightedRHF("");
    setHighlightedHF("");
  };

  const handleSubmit = () => {
    onSubmit(unitSelection);
    setOpen(false);
    setHighlightedRHF("");
    setHighlightedHF("");
  };

  const handleSearch = (itemId: string[]) => {
    const newUnitSelection = [...unitSelection, ...itemId];
    setUnitSelection([...new Set(newUnitSelection)]);
  };

  const handleClear = () => {
    setHighlightedRHF("");
    setHighlightedHF("");
    setUnitSelection(["Nasjonalt"]);
  };

  const selectedCount = Math.max(
    0,
    unitSelection.filter((unit) => unit !== "Nasjonalt").length,
  );

  const columnScrollClass =
    "min-h-0 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:var(--brand-primary-300)_transparent] [scrollbar-gutter:stable] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand-primary-300 hover:[&::-webkit-scrollbar-thumb]:bg-brand-primary-400";

  return (
    <Dialog
      open={open}
      fullWidth
      scroll="paper"
      slotProps={{
        paper: {
          sx: {
            maxWidth: "100dvh",
            height: "80dvh",
            maxHeight: "80dvh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            paddingY: "var(--spacing-3)",
          },
        },
      }}
    >
      <div className="text-right pr-4 text-brand-primary-400 truncate">
        <IconButton onClick={handleClose} aria-label="Lukk popup">
          <Icon symbol="close" />
        </IconButton>
      </div>
      <div className="flex flex-1 min-h-0 w-full flex-col px-8 pt-0 pb-4">
        <div className="flex flex-row justify-between text-brand-primary-700">
          <h4>Velg behandlingsenheter</h4>
        </div>
        <DialogContent
          className="flex flex-col flex-1 min-h-0 px-0! pt-4!"
          sx={{ overflow: "hidden" }}
        >
          {unitNamesQuery.isFetching ? (
            LoadingComponent
          ) : (
            <div className="flex flex-1 min-h-0 flex-col">
              <Box marginTop={0} marginBottom={0} className="pb-6">
                <div className="text-sm font-semibold pb-2">Søk</div>
                <TreeViewSearchBox
                  options={Array.from(treatmentUnitsValueMap.values())}
                  onSearch={handleSearch}
                  size="small"
                />
              </Box>
              <div className="flex flex-1 min-h-0">
                <div
                  className={`flex flex-col py-5 ${columnScrollClass} ${highlightedHF ? "w-1/3" : "w-1/2"} rounded-l-md text-brand-primary-700 transition-all`}
                  style={{ background: columnColour1 }}
                >
                  <FormControl sx={{ width: "100%" }}>
                    {RHFCheckboxes?.map((row: JSX.Element) => row)}
                  </FormControl>
                </div>

                <div
                  className={`flex flex-col py-5 flex-1 ${columnScrollClass} text-dark transition-all ${highlightedHF ? "w-1/3" : "w-1/2"}`}
                  style={{ background: columnColour2 }}
                >
                  <h6
                    className={`${highlightedRHF || highlightedHF ? "hidden" : "flex pt-3.25 pl-5"} flex-1 grow text-center h-full flex-row font-regular`}
                  >
                    Velg et behandlingssted på venstre side
                  </h6>
                  <FormControl sx={{ width: "100%" }}>
                    {HFCheckBoxes[highlightedRHF]?.map(
                      (row: JSX.Element) => row,
                    )}
                  </FormControl>
                </div>

                {highlightedHF && (
                  <div
                    className={`flex flex-col py-5 pr-5 flex-1 ${columnScrollClass} rounded-r-md text-dark w-1/3 transition-all`}
                    style={{ background: columnColour3 }}
                  >
                    <FormControl sx={{ width: "100%" }}>
                      {HospitalCheckBoxes[highlightedHF]?.map(
                        (row: JSX.Element) => row,
                      )}
                    </FormControl>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions className="p-0! pt-2!">
          <Button variant="text" onClick={handleClear}>
            Tøm filter
          </Button>
          <Button
            onClick={handleSubmit}
          >{`Vis resultat (${selectedCount})`}</Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

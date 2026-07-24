import { Box, Button, Icon, IconButton } from "@mong/material-ui";
import {
  // Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import type { UseQueryResult } from "@tanstack/react-query";
import { mainQueryParamsConfig, useUnitNamesQuery } from "qmongjs";
import React, {
  type Dispatch,
  type JSX,
  type SetStateAction,
  useState,
} from "react";
import type { NestedTreatmentUnitName } from "types";
import { useQueryParam } from "use-query-params";
import { getTreatmentUnitsTree } from "../FilterMenu/TreatmentQualityFilterMenu/filterMenuOptions";
import { getFilterSettingsValuesMap } from "../FilterMenu/TreeViewFilterSection";
import TreeViewSearchBox from "../FilterMenu/TreeViewSearchBox";
import { LoadingComponent } from "../Placeholders/LoadingComponent/LoadingComponent";
import {
  borderRadius,
  columnColour1,
  columnColour2,
  columnColour3,
  marginTop,
  rippleOffset,
} from "./styles";

type TreatmentUnitPopupProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: Dispatch<SetStateAction<string[]>>;
  context: string;
  type: string;
  selectionType?: "multiple" | "single";
};

export const TreatmentUnitPopup = (props: TreatmentUnitPopupProps) => {
  const {
    open,
    setOpen,
    onSubmit,
    context,
    type,
    selectionType = "multiple",
  } = props;
  const [highlightedRHF, setHighlightedRHF] = useState<string>("");
  const [highlightedHF, setHighlightedHF] = useState<string>("");

  const [unitSelection = ["Nasjonalt"], setUnitSelection] = useQueryParam(
    selectionType === "single" ? "selected_treatment_units" : "units",
    mainQueryParamsConfig.units,
  );

  const unitNamesQuery: UseQueryResult<
    { nestedUnitNames: NestedTreatmentUnitName[] },
    unknown
  > = useUnitNamesQuery("all", context, type);

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

      return selectionType === "multiple" ? (
        <FormControlLabel
          value={rhf.rhf}
          label={rhf.rhf}
          key={rhf.rhf}
          onClick={() => {
            setHighlightedRHF(rhf.rhf);
            setHighlightedHF("");
          }}
          sx={{
            width: "100%",

            background:
              highlightedRHF === rhf.rhf ? columnColour2 : columnColour1,
          }}
          control={
            <Checkbox
              checked={unitSelection.includes(rhf.rhf)}
              indeterminate={
                !unitSelection.includes(rhf.rhf) &&
                (hfChecked() || hospitalsChecked())
              }
              onChange={handleChange}
              key={`${rhf.rhf}_checkbox`}
            />
          }
        />
      ) : (
        <FormControlLabel
          value={rhf.rhf}
          label={rhf.rhf}
          key={rhf.rhf}
          onClick={() => {
            setHighlightedRHF(rhf.rhf);
            setHighlightedHF("");
          }}
          sx={{
            width: "100%",
            margin: "0px",
            paddingLeft: "20px",
            background:
              highlightedRHF === rhf.rhf ? columnColour2 : columnColour1,
          }}
          control={
            <Radio
              sx={{
                color: "var(--brand-primary-400)",
              }}
            />
          }
        />
      );
    }) as JSX.Element[]);

  // #################################################### //
  // Map HFs and hospitals and return checkbox components //
  // #################################################### //

  const HFCheckBoxes = {};
  const HospitalCheckBoxes = {};

  unitNames?.forEach((unitName: NestedTreatmentUnitName) => {
    const hfs = unitName.hf.sort((a, b) => {
      return a.hf_sort - b.hf_sort;
    });

    // ######################### //
    // ##### Map hospitals ##### ∕∕
    // ######################### //
    hfs.forEach((hf) => {
      const CheckBoxes = hf.hospital.map((hospital) => {
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.checked) {
            const newUnitSelection = [...unitSelection, hospital];
            setUnitSelection([...newUnitSelection]);
          } else {
            const newUnitSelection = [
              ...unitSelection.filter((row) => {
                return row !== hospital;
              }),
            ];
            setUnitSelection(newUnitSelection);
          }
        };

        return selectionType === "multiple" ? (
          <FormControlLabel
            label={hospital}
            key={hospital}
            sx={{
              width: "100%",
              background: columnColour3,
            }}
            control={
              <Checkbox
                checked={unitSelection.includes(hospital)}
                onChange={handleChange}
                key={`${hospital}_checkbox`}
              />
            }
          />
        ) : (
          <FormControlLabel
            label={hospital}
            value={hospital}
            key={hospital}
            sx={{
              width: "100%",
              margin: "0px",
              background: columnColour3,
              paddingLeft: "20px",
            }}
            control={
              <Radio
                sx={{
                  color: "var(--brand-primary-400)",
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
              return row !== hf.hf;
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
          value={hf.hf}
          onClick={() => {
            setHighlightedHF(hf.hf);
          }}
          sx={{
            width: "100%",
            margin: "0px",
            paddingLeft: "20px",
            background: highlightedHF === hf.hf ? columnColour3 : columnColour2,
          }}
          control={
            selectionType === "multiple" ? (
              <Checkbox
                checked={unitSelection.includes(hf.hf)}
                indeterminate={
                  !unitSelection.includes(hf.hf) && hospitalChecked()
                }
                onChange={handleChange}
                key={`${hf.hf}_checkbox`}
              />
            ) : (
              <Radio
                sx={{
                  color: "var(--brand-primary-400)",
                }}
              />
            )
          }
        />
      );
    });
    HFCheckBoxes[unitName.rhf] = CheckBoxes;
  });

  const handleClose = () => {
    setOpen(false);
    setHighlightedRHF("");
    onSubmit([]);
  };

  const handleSubmit = () => {
    onSubmit(unitSelection.filter((unit): unit is string => unit !== null));
    setOpen(false);
    setHighlightedRHF("");
  };

  const handleSearch = (itemId: string[]) => {
    const newUnitSelection = [...unitSelection, ...itemId];
    setUnitSelection([...newUnitSelection]);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnitSelection([event.target.value]);
  };

  return (
    <Dialog
      open={open}
      fullWidth
      scroll="body"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "780px", // Set your custom width here
          },
        },
      }}
    >
      <div className="text-right pt-4 pr-4 text-brand-primary-400">
        <IconButton onClick={handleClose} aria-label="Small Star">
          <Icon symbol="close" />
        </IconButton>
      </div>
      <div className="flex flex-1 flex-col p-6 pt-0">
        <div className="flex flex-row justify-between text-brand-primary-700">
          <h4>Velg behandlingssted</h4>
        </div>
        <DialogContent
          className="flex flex-col h-auto flex-1 px-0!"
          // sx={{ height: "auto", maxHeight: "600px" }}
          // onMouseLeave={() => {
          //   setHighlightedRHF("");
          //   setHighlightedHF("");
          // }}
        >
          {unitNamesQuery.isFetching ? (
            LoadingComponent
          ) : (
            <div>
              <Box padded={false} color="transparent" className="pb-6">
                <div className="text-sm font-semibold pb-2">Søk</div>
                <TreeViewSearchBox
                  size="small"
                  options={Array.from(treatmentUnitsValueMap.values())}
                  onSearch={handleSearch}
                />
              </Box>
              <div className="flex outline -outline-offset-1 outline-neutral-0 rounded-md">
                <div
                  className={`flex flex-1 w-full py-0,5 bg-brand-primary-50 text-brand-primary-700 rounded-l-md`}
                >
                  {/* RHF Column */}
                  <FormControl sx={{ width: "100%" }}>
                    {selectionType === "single" ? (
                      <RadioGroup
                        aria-labelledby={`RHF-label`}
                        aria-label="RHF"
                        name="row-radio-buttons-group"
                        value={unitSelection[0] || ""}
                        onChange={handleRadioChange}
                      >
                        {RHFCheckboxes?.map((row: JSX.Element) => row)}
                      </RadioGroup>
                    ) : (
                      RHFCheckboxes?.map((row: JSX.Element) => row)
                    )}
                  </FormControl>
                </div>

                <div
                  className={`flex flex-2 w-full py-0,5 bg-brand-primary-200 h-full text-brand-primary-700`}
                >
                  {/* HF Column */}
                  {!highlightedRHF && selectionType === "single" && (
                    <h6 className="pl-2 py-2 text-center w-full flex flex-row whitespace-nowrap font-regular">
                      Velg et behandlingssted på venstre side
                    </h6>
                  )}
                  <FormControl
                    sx={{
                      width: "100%",
                    }}
                  >
                    {selectionType === "multiple" ? (
                      HFCheckBoxes[highlightedRHF]?.map(
                        (row: JSX.Element) => row,
                      )
                    ) : (
                      <RadioGroup
                        aria-labelledby={`HF-label`}
                        aria-label="HF"
                        name="row-radio-buttons-group"
                        value={unitSelection[0] || ""}
                        onChange={handleRadioChange}
                      >
                        {HFCheckBoxes[highlightedRHF]?.map(
                          (row: JSX.Element) => row,
                        )}
                      </RadioGroup>
                    )}
                  </FormControl>
                </div>
                {highlightedHF && (
                  <div className="flex flex-1 w-full h-full py-0,5 bg-brand-primary-100  rounded-r-md">
                    {/* Hospitals Column */}
                    <FormControl
                      sx={{
                        width: "100%",
                      }}
                    >
                      {/* <div className=""> */}
                      {selectionType === "single" ? (
                        <RadioGroup
                          aria-labelledby={`Hospital-label`}
                          aria-label="Hospital"
                          name="row-radio-buttons-group"
                          value={unitSelection[0] || ""}
                          onChange={handleRadioChange}
                        >
                          {HospitalCheckBoxes[highlightedHF]?.map(
                            (row: JSX.Element) => row,
                          )}
                        </RadioGroup>
                      ) : (
                        HospitalCheckBoxes[highlightedHF]?.map(
                          (row: JSX.Element) => row,
                        )
                      )}
                      {/* </div> */}
                    </FormControl>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions className="p-0!">
          <Button
            variant="text"
            onClick={() => {
              const unitSelection =
                selectionType === "single" ? [""] : ["Nasjonalt"];
              setHighlightedRHF("");
              setHighlightedHF("");
              setUnitSelection(unitSelection);
            }}
          >
            Tøm filter
          </Button>
          <Button onClick={handleSubmit} disabled={unitSelection.length === 0}>
            Vis resultat
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

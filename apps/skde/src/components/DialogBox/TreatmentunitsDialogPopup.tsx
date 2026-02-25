import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { useUnitNamesQuery } from "qmongjs";
import { NestedTreatmentUnitName } from "types";

type TreatmentUnitPopupProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: Dispatch<SetStateAction<string[]>>;
  context: string;
  type: string;
};

export const TreatmentUnitPopup = (props: TreatmentUnitPopupProps) => {
  const { open, setOpen, onSubmit, context, type } = props;

  const [rhfSelection, setRHFSelection] = useState<string[]>([]);
  const [highlightedRHF, setHighlightetMedField] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unitNamesQuery: UseQueryResult<any, unknown> = useUnitNamesQuery(
    "all",
    context,
    type,
  );

  const RHFCheckboxes =
    unitNamesQuery.data &&
    (unitNamesQuery.data.nestedUnitNames.map((row: NestedTreatmentUnitName) => {
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Add RHF to the selection
        if (event.target.checked) {
          // May contain duplicates
          const newRHFSelection = [...rhfSelection, row.rhf];

          setRHFSelection([...new Set(newRHFSelection)]);
        } else {
          const newRHFSelection = [...rhfSelection].filter((rhf) => {
            return rhf !== row.rhf;
          });
          setRHFSelection([...new Set(newRHFSelection)]);
        }
      };

      return (
        <FormControlLabel
          label={row.rhf}
          key={row.rhf}
          onMouseEnter={() => {
            setHighlightetMedField(row.rhf);
          }}
          control={
            <Checkbox
              checked={rhfSelection.includes(row.rhf)}
              onChange={handleChange}
              key={row.rhf + "_checkbox"}
            />
          }
        />
      );
    }) as JSX.Element[]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    onSubmit(["Nasjonalt", ...rhfSelection]);
    setOpen(false);
  };

  return (
    <Dialog open={open} fullWidth={true} maxWidth={"lg"}>
      <DialogTitle>Velg fagområde</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={6}>
            <FormControl sx={{ m: 1, width: "50%" }}>
              {RHFCheckboxes && RHFCheckboxes.map((row: JSX.Element) => row)}
            </FormControl>
          </Grid>
          <Grid size={6}></Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Avbryt</Button>
        <Button onClick={handleSubmit}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

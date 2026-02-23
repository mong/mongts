import {
  Dialog,
  DialogTitle,
  Select,
  MenuItem,
  DialogContent,
  DialogActions,
  Button,
  SelectChangeEvent,
  InputLabel,
  FormControl,
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

  const [selection, setSelection] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unitNamesQuery: UseQueryResult<any, unknown> = useUnitNamesQuery(
    "all",
    context,
    type,
  );

  const rhfs = unitNamesQuery.data
    ? unitNamesQuery.data.nestedUnitNames.map(
        (row: NestedTreatmentUnitName) => row.rhf,
      )
    : [];

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    onSubmit([selection]);
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setSelection(value);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Velg behandlingssted</DialogTitle>
      <DialogContent>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel>Behandlingsenhet</InputLabel>
          <Select
            value={selection}
            onChange={handleChange}
            label="Behandlingsenhet"
          >
            {rhfs.map((rhf) => {
              return <MenuItem value={rhf}>{rhf}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Avbryt</Button>
        <Button onClick={handleSubmit}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

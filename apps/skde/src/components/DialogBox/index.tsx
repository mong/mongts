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
import { useMedicalFieldsQuery } from "qmongjs";

type MedicalFieldPopupProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: Dispatch<SetStateAction<string[]>>;
};

export const MedicalFieldPopup = (props: MedicalFieldPopupProps) => {
  const { open, setOpen, onSubmit } = props;

  const [selection, setSelection] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const medicalFieldsQuery: UseQueryResult<any, unknown> =
    useMedicalFieldsQuery();

  const registries = medicalFieldsQuery.data.map((row) => row.registers).flat();

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
      <DialogTitle>Set backup account</DialogTitle>
      <DialogContent>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel>Fagområde</InputLabel>
          <Select value={selection} onChange={handleChange}>
            {registries.map((registry) => {
              return <MenuItem value={registry}>{registry}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};

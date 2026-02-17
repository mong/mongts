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

export type MedicalFieldPopupProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: Dispatch<SetStateAction<string[]>>;
};

export const MedicalFieldPopup = (props: MedicalFieldPopupProps) => {
  const { open, setOpen, onSubmit } = props;

  const [selection, setSelection] = useState<string>("");

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
            <MenuItem value="Ingen">Ingen</MenuItem>
            <MenuItem value="hjerneslag">Hjerneslag</MenuItem>
            <MenuItem value="hjerteinfarkt">Hjerteinfarkt</MenuItem>
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

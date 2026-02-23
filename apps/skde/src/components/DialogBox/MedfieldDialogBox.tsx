import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { useMedicalFieldsQuery } from "qmongjs";
import { Medfield } from "types";

type MedicalFieldPopupProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: Dispatch<SetStateAction<string[]>>;
};

export const MedicalFieldPopup = (props: MedicalFieldPopupProps) => {
  const { open, setOpen, onSubmit } = props;

  const [medFieldSelection, setMedFieldSelection] = useState<string[]>([]);
  const [registrySelection, setRegistrySelection] = useState<string[]>([]);
  const [highlightetMedField, setHighlightetMedField] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const medicalFieldsQuery: UseQueryResult<any, unknown> =
    useMedicalFieldsQuery();

  const MedfieldCheckboxes =
    medicalFieldsQuery.data &&
    medicalFieldsQuery.data.map((medfield: Medfield) => {
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (
          event.target.checked &&
          !medFieldSelection.includes(medfield.name)
        ) {
          const newSelection = [...medFieldSelection, medfield.name];
          setMedFieldSelection([...newSelection]);
        } else if (
          !event.target.checked &&
          medFieldSelection.includes(medfield.name)
        ) {
          const ind = medFieldSelection.indexOf(medfield.name);
          const newSelection = [...medFieldSelection];
          newSelection.splice(ind, 1);
          setMedFieldSelection(newSelection);
        }
      };

      return (
        <FormControlLabel
          label={medfield.name}
          key={medfield.shortName}
          onMouseEnter={() => {
            setHighlightetMedField(medfield.name);
          }}
          control={
            <Checkbox
              checked={medFieldSelection.includes(medfield.name)}
              onChange={handleChange}
              key={medfield.name}
            />
          }
        />
      );
    });

  const RegistryCheckBoxes = {};

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  medicalFieldsQuery.data &&
    medicalFieldsQuery.data.map((medfield: Medfield) => {
      const CheckBoxes = medfield.registers.map((registry) => {
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.checked && !registrySelection.includes(registry)) {
            const newSelection = [...registrySelection, registry];
            setRegistrySelection([...newSelection]);
          } else if (
            !event.target.checked &&
            registrySelection.includes(registry)
          ) {
            const ind = registrySelection.indexOf(registry);
            const newSelection = [...registrySelection];
            newSelection.splice(ind, 1);
            setRegistrySelection(newSelection);
          }
        };

        return (
          <FormControlLabel
            label={registry}
            key={registry}
            control={
              <Checkbox
                checked={registrySelection.includes(registry)}
                onChange={handleChange}
                key={registry + "_box"}
              />
            }
          />
        );
      });
      RegistryCheckBoxes[medfield.name] = CheckBoxes;
    });

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const selectedRegistries = medicalFieldsQuery.data
      .filter((medfield: Medfield) => {
        return medFieldSelection.includes(medfield.name);
      })
      .map((medfield: Medfield) => {
        return medfield.registers;
      })
      .flat();

    onSubmit(selectedRegistries);
    setOpen(false);
  };

  return (
    <Dialog open={open} fullWidth={true} maxWidth={"lg"}>
      <DialogTitle>Velg fagområde</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={6}>
            <FormControl sx={{ m: 1, width: "50%" }}>
              {MedfieldCheckboxes && MedfieldCheckboxes.map((row) => row)}
            </FormControl>
          </Grid>
          <Grid size={6}>
            <FormControl sx={{ m: 1, width: "50%" }}>
              {RegistryCheckBoxes[highlightetMedField] &&
                RegistryCheckBoxes[highlightetMedField].map((row) => row)}
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Avbryt</Button>
        <Button onClick={handleSubmit}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

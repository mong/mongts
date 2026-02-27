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
  Box,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { useMedicalFieldsQuery, useRegisterNamesQuery } from "qmongjs";
import { Medfield, RegisterName } from "types";

type MedicalFieldPopupProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: Dispatch<SetStateAction<string[]>>;
};

export const MedicalFieldPopup = (props: MedicalFieldPopupProps) => {
  const { open, setOpen, onSubmit } = props;
  const [registrySelection, setRegistrySelection] = useState<string[]>([]);
  const [highlightedMedField, setHighlightedMedField] = useState<string>("");

  const columnColour1 = "#F7FBFF";
  const columnColour2 = "#E0F1FF";

  const checkboxWidth = 18;
  const rippleWidth = 42;
  const rippleOffset = (rippleWidth - checkboxWidth) / 2;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const medicalFieldsQuery: UseQueryResult<any, unknown> =
    useMedicalFieldsQuery();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const registryQuery: UseQueryResult<any, unknown> = useRegisterNamesQuery();

  const MedfieldCheckboxes =
    medicalFieldsQuery.data &&
    (medicalFieldsQuery.data.map((medfield: Medfield) => {
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Add medfield to the selection
        if (event.target.checked) {
          // May contain duplicates
          const newRegistrySelection = [
            ...registrySelection,
            ...medfield.registers,
          ];

          setRegistrySelection([...new Set(newRegistrySelection)]);

          // Remove medfield from the selection
        } else {
          const newRegistrySelection = [...registrySelection].filter(
            (registry) => {
              return !medfield.registers.includes(registry);
            },
          );
          setRegistrySelection(newRegistrySelection);
        }
      };

      const registryChecked = (row: string) => {
        return registrySelection.includes(row);
      };

      return (
        <FormControlLabel
          label={medfield.name}
          key={medfield.shortName}
          onMouseEnter={() => {
            setHighlightedMedField(medfield.name);
          }}
          sx={{
            width: "100%",
            background:
              highlightedMedField === medfield.name
                ? columnColour2
                : columnColour1,
          }}
          control={
            <Checkbox
              checked={medfield.registers.every(registryChecked)}
              indeterminate={
                !medfield.registers.every(registryChecked) &&
                medfield.registers.some(registryChecked)
              }
              onChange={handleChange}
              key={medfield.name}
            />
          }
        />
      );
    }) as JSX.Element[]);

  const RegistryCheckBoxes = {};

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  medicalFieldsQuery.data &&
    registryQuery.data &&
    medicalFieldsQuery.data.map((medfield: Medfield) => {
      const CheckBoxes = medfield.registers.map((registry) => {
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.checked) {
            const newSelection = [...registrySelection, registry];
            setRegistrySelection([...newSelection]);
          } else {
            const newSelection = [
              ...registrySelection.filter((row) => {
                return row != registry;
              }),
            ];
            setRegistrySelection(newSelection);
          }
        };

        return (
          <FormControlLabel
            label={
              registryQuery.data.find((row: RegisterName) => {
                return row.rname == registry;
              }).short_name
            }
            key={registry}
            sx={{ width: "100%", background: columnColour2 }}
            control={
              <Checkbox
                checked={registrySelection.includes(registry)}
                onChange={handleChange}
                key={registry + "_checkbox"}
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
    onSubmit(registrySelection);
    setOpen(false);
  };

  return (
    <Dialog open={open} fullWidth={true} maxWidth={"lg"}>
      <DialogTitle>Velg fagområde</DialogTitle>
      <DialogContent
        sx={{ height: 800 }}
        onMouseLeave={() => {
          setHighlightedMedField("");
        }}
      >
        <Grid container height="100%">
          <Grid size={6}>
            <Box
              sx={{
                background: columnColour1,
                height: "100%",
                paddingLeft: rippleOffset + "px",
              }}
            >
              <FormControl sx={{ width: "100%" }}>
                {MedfieldCheckboxes &&
                  MedfieldCheckboxes.map((row: JSX.Element) => row)}
              </FormControl>
            </Box>
          </Grid>
          <Grid size={6}>
            <Box
              sx={{
                background: highlightedMedField && columnColour2,
                height: "100%",
                marginLeft: "-" + rippleOffset + "px",
              }}
            >
              <FormControl
                sx={{ width: "100%", marginLeft: rippleOffset + "px" }}
              >
                {RegistryCheckBoxes[highlightedMedField] &&
                  RegistryCheckBoxes[highlightedMedField].map(
                    (row: JSX.Element) => row,
                  )}
              </FormControl>
            </Box>
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

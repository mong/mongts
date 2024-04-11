import { Autocomplete, TextField } from "@mui/material";
import { TreeViewFilterSettingsValue } from "./TreeViewFilterSection";

export type TreeViewSearchBoxProps = {
  hintText?: string;
  options: TreeViewFilterSettingsValue[];
};

interface AutocompleteOption {
  label: string;
  displayText: string;
}

export function TreeViewSearchBox(props: TreeViewSearchBoxProps) {
  const hintText = props.hintText || "Søk...";
  const options: AutocompleteOption[] = props.options.map((option) => ({
    displayText: option.valueLabel,
    label: option.value,
  }));

  return (
    <>
      <Autocomplete
        autoHighlight
        options={options}
        renderInput={(params) => <TextField {...params} label={hintText} />}
      />
    </>
  );
}

export default TreeViewSearchBox;

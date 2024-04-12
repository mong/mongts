import { Autocomplete, TextField } from "@mui/material";
import { TreeViewFilterSettingsValue } from "./TreeViewFilterSection";

export type TreeViewSearchBoxProps = {
  hintText?: string;
  options: TreeViewFilterSettingsValue[];
};

interface AutocompleteOption {
  label: string;
}

export function TreeViewSearchBox(props: TreeViewSearchBoxProps) {
  const hintText = props.hintText || "Søk...";
  const options: AutocompleteOption[] = props.options.map((option) => ({
    label: option.valueLabel,
  }));

  return (
    <>
      <Autocomplete
        autoHighlight
        options={Array.from(
          new Set<string>(options.map((option) => option.label)),
        )}
        renderInput={(params) => <TextField {...params} label={hintText} />}
      />
    </>
  );
}

export default TreeViewSearchBox;

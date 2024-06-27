import { Autocomplete, TextField } from "@mui/material";
import { TreeViewFilterSettingsValue } from "./TreeViewFilterSection";

type TreeViewSearchBoxProps = {
  hintText?: string;
  options: TreeViewFilterSettingsValue[];
  onSearch: (nodeValues: string[]) => void;
};

interface AutocompleteOption {
  label: string;
  value: string;
}

function TreeViewSearchBox(props: TreeViewSearchBoxProps) {
  const hintText = props.hintText || "Søk...";
  const options: AutocompleteOption[] = props.options.map((option) => ({
    label: option.valueLabel,
    value: option.value,
  }));

  return (
    <>
      <Autocomplete
        autoHighlight
        options={Array.from(
          new Set<string>(options.map((option) => option.label)),
        )}
        renderInput={(params) => <TextField {...params} label={hintText} />}
        onChange={(_, newValue) => {
          if (newValue) {
            props.onSearch(
              options
                .filter((option) => option.label === newValue)
                .map((option) => option.value),
            );
          }
        }}
      />
    </>
  );
}

export default TreeViewSearchBox;

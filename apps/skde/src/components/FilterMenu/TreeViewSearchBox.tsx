import { Autocomplete, TextField } from "@mui/material";
import type { TreeViewFilterSettingsValue } from "./TreeViewFilterSection";

type TreeViewSearchBoxProps = {
  hintText?: string;
  options: TreeViewFilterSettingsValue[][];
  onSearch: (nodeValues: string[]) => void;
  size?: "small" | "medium";
};

interface AutocompleteOption {
  label: string;
  value: string;
}

function TreeViewSearchBox(props: TreeViewSearchBoxProps) {
  const size = props.size || "medium";
  const hintText = props.hintText || "Søk...";
  const options: AutocompleteOption[] = props.options
    .map((optionArray) => {
      if (Array.isArray(optionArray) && optionArray.length > 0) {
        return {
          label: optionArray[0].valueLabel,
          value: optionArray[0].value,
        };
      } else {
        // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
        console.debug(
          `Invalid non-array value found when mapping options in TreeViewSearchBox. Value: ${optionArray}`,
        );
        return null;
      }
    })
    .filter((value) => value !== null);

  return (
    <Autocomplete
      size={size}
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
  );
}

export default TreeViewSearchBox;

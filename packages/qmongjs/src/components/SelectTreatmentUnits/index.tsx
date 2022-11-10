import Select, { StylesConfig } from "react-select";

import { app_text } from "../../app_config";

export interface OptsTu {
  label: string;
  options: {
    value: string;
    label: string;
  }[];
}

interface Props {
  opts: OptsTu[];
  placeholder: JSX.Element;
  update_tu(x: string[] | undefined): void;
  treatment_unit: string[];
}

function SelectTreatmentUnits(props: Props) {
  const { opts = [], placeholder, update_tu, treatment_unit } = props;
  const selection_options = opts;
  type OptionType = {
    label: string;
    value: string;
  };
  type IsMulti = true;
  const customStyles: StylesConfig<OptionType, IsMulti> = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      backgroundColor: "white",
      boxShadow: state.isFocused ? undefined : undefined,
      fontSize: "1rem",
      border: "none",
      borderRadius: state.isFocused ? 0 : 0,
      borderBottom: state.isFocused ? "3px solid #7ebec7" : "3px solid #EEF6F7",
      cursor: "text",
    }),
    input: (provided) => ({
      ...provided,
      paddingLeft: "1.3rem",
    }),
    multiValue: (provided) => ({
      ...provided,
      color: "#00263d",
      backgroundColor: "#EEF6F7",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "black",
      fontSize: "1.2rem",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: "none",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 3,
    }),
    option: (provided) => ({
      ...provided,
    }),
  };
  const value_tu = treatment_unit.map((tu) => ({ value: tu, label: tu }));
  const handle_input_change = (e: { value: string }[]) => {
    const tu = e?.length > 0 ? e.map((e) => e.value) : undefined;
    update_tu(tu);
  };

  return (
    <form data-testid="tu_selector">
      <Select
        options={selection_options}
        placeholder={placeholder}
        closeMenuOnSelect={true}
        value={value_tu}
        openMenuOnClick={false}
        isSearchable
        isMulti={true}
        onChange={(e: any) => handle_input_change(e)}
        styles={customStyles}
        menuIsOpen={
          treatment_unit.length < app_text.tu_list.max_nr_tu ? undefined : false
        }
      />
    </form>
  );
}

export default SelectTreatmentUnits;

import Select, { StylesConfig } from "react-select";
interface Props {
  opts: number[];
  update_year(int: number): void;
  selected_year: number;
}
function SelectYear(props: Props) {
  const { opts = [], update_year, selected_year } = props;
  const selection_options = opts.map((opt) => ({
    value: opt.toString(),
    label: opt.toString(),
  }));
  const selected_option =
    selection_options[
      selection_options.findIndex((v) => v.value === selected_year.toString()) |
        0
    ];
  const defaultValue = selected_option;
  const handle_input_change = (e: { value: number; label: number }) => {
    update_year(e.value);
  };

  type OptionType = {
    label: string;
    value: string;
  };
  type IsMulti = false;
  const customStyles: StylesConfig<OptionType, IsMulti> = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      backgroundColor: "white",
      boxShadow: "none",
      fontSize: "1.1rem",
      border: state.isFocused ? "3px solid #7ebec7" : "3px solid #EEF6F7",
      minHeight: "2rem",
      cursor: "pointer",
    }),
    input: (provided) => ({
      ...provided,
      //color: "#EEF6F7",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 3,
    }),
    option: (provided) => ({
      ...provided,
    }),
  };

  return (
    <form data-testid="year_selector">
      <Select
        onChange={(e) => handle_input_change(e)}
        options={selection_options}
        defaultValue={defaultValue}
        value={selected_option}
        isSearchable
        styles={customStyles}
      />
    </form>
  );
}

export default SelectYear;

import { Dispatch, useState } from "react";

import { UnitNameListHeader } from "./unitnamelistheader";
import { UnitNameListBody } from "./unitnamelistbody";
import { useEventListener } from "../../../helpers/hooks/useEventListener";
import styles from "./index.module.css";
import { FaRegTimesCircle } from "react-icons/fa";

interface NestedUnitName {
  rhf: string;
  hf: {
    hf: string;
    hf_full: string;
    hospital: string[];
  }[];
}

interface Props {
  nestedUnitNames: NestedUnitName[];
  treatment_units: string[];
  update_treatment_units: Dispatch<string[]>;
  multiple_choice: boolean;
}

export const UnitNameList = (props: Props) => {
  const {
    nestedUnitNames,
    treatment_units,
    update_treatment_units,
    multiple_choice,
  } = props;
  const [tu_list_display, update_tu_list_display] = useState("none");
  const style_tu_list = { display: tu_list_display };
  const tu_str_elm = nestedUnitNames.map((element) => {
    return (
      <UnitNameListBody
        key={`rhf_${element.rhf}`}
        treatment_units={treatment_units}
        update_treatment_units={update_treatment_units}
        tu_names={element}
        multiple_choice={multiple_choice}
      />
    );
  });
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.defaultPrevented) {
      return;
    }
    switch (event.key) {
      case "Esc":
      case "Escape":
        update_tu_list_display("none");
        break;
      default:
        return;
    }
    event.preventDefault();
  };
  useEventListener("keydown", handleKeyDown);

  return (
    <>
      <div className={styles.hospital_list_btn_container}>
        <button
          className={styles.hospital_list_btn}
          onClick={() => update_tu_list_display("")}
          data-testid="vis_alle_button"
        >
          Vis alle
        </button>
      </div>
      <div
        style={style_tu_list}
        className={styles.tu_list}
        data-testid="tu_list"
      >
        <UnitNameListHeader />
        <div className={styles.all_tu}>{tu_str_elm}</div>
        <button
          onClick={() => update_tu_list_display("none")}
          className={styles.tu_list_close_btn}
          data-testid="tu_list_close"
        >
          <FaRegTimesCircle />
        </button>
      </div>
    </>
  );
};

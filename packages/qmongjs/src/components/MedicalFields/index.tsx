import React, { Dispatch } from "react";

import { MedicalFieldEntry } from "./medicalfieldentry";
import styles from "./index.module.css";

interface MedicalFieldProps {
  medicalFields: MedicalFieldObject[];
  clicked_med_field: string;
  update_clicked_med_field: Dispatch<string>;
  selection_bar_height: number;
  legend_height: number | null;
}
interface MedicalFieldObject {
  shortName: string;
  name: string;
  registers: string[];
}

export const MedicalFields: React.FC<MedicalFieldProps> = (props) => {
  const {
    medicalFields,
    clicked_med_field,
    update_clicked_med_field,
    selection_bar_height,
    legend_height,
  } = props;

  const med_field_row = medicalFields.map((med_field: MedicalFieldObject) => {
    return (
      <MedicalFieldEntry
        key={med_field.shortName}
        med_field={med_field}
        nr_indicators={10}
        clicked_med_field={clicked_med_field}
        update_clicked_med_field={update_clicked_med_field}
      />
    );
  });

  const checked_class = (clicked_med_field ?? "all") === "all" ? "checked" : "";
  const style = legend_height
    ? { top: `${legend_height + selection_bar_height}px` }
    : {};
  const handle_med_field_click = () => {
    update_clicked_med_field("all");
  };

  return (
    <ul
      style={style}
      className={styles.medFieldList}
      data-testid="med_field_list"
    >
      <li className={`${styles.medFieldTitle} ${checked_class}`}>
        <button onClick={() => handle_med_field_click()}>
          <h4 className={styles.medFieldText}>ALLE INDIKATORER</h4>
        </button>
      </li>
      {med_field_row}
    </ul>
  );
};

export default MedicalFields;

import React, { Dispatch } from "react";
import styles from "./index.module.css";

interface medField {
  shortName: string;
  name: string;
  registers: string[];
}

interface Props {
  med_field: medField;
  nr_indicators: number;
  update_clicked_med_field: Dispatch<string>;
  clicked_med_field: string;
}
export const MedicalFieldEntry: React.FC<Props> = (props) => {
  const { med_field, update_clicked_med_field, clicked_med_field } = props;

  const class_checked =
    med_field.shortName === clicked_med_field ? "checked" : "";

  const handle_med_field_click = () => {
    update_clicked_med_field(med_field.shortName);
  };

  return (
    <li
      className={`${styles.medField} ${class_checked} medField_${med_field.shortName}`}
      data-testid={`medfield_${med_field.shortName}`}
    >
      <button
        className={styles.medFieldText}
        onClick={() => handle_med_field_click()}
        data-testid={`medfieldbutton_${med_field.shortName}`}
      >
        {med_field.name.toUpperCase()}
      </button>
    </li>
  );
};

export default MedicalFieldEntry;

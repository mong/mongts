import { FaCircle, FaAdjust, FaRegCircle } from "react-icons/fa";

interface Props {
  level: string;
  icon_class: string;
  legend_btn_class: string;
  update_show_level_filter(p: string | undefined): void;
  show_level_filter: string;
}

function LEGEND_BTN(props: Props) {
  const {
    level = "Høy måloppnåelse",
    icon_class = "fa fa-fas fa-circle",
    legend_btn_class = "high",
    update_show_level_filter,
    show_level_filter,
  } = props;

  const level_filter = legend_btn_class[0].toUpperCase();
  const checked_class = level_filter === show_level_filter ? "checked" : "";
  const handle_level_filter = (current_state: string, update_state: string) => {
    current_state === update_state
      ? update_show_level_filter(undefined)
      : update_show_level_filter(update_state);
  };

  return (
    <button
      className={`${legend_btn_class} ${checked_class}`}
      onClick={() => handle_level_filter(show_level_filter, level_filter)}
    >
      <i style={{ paddingRight: "0.2em" }}>
        {icon_class === "fa fa-fas fa-circle" ? (
          <FaCircle style={{ color: "#3baa34", fontSize: "1.2rem" }} />
        ) : icon_class === "fa fa-fas fa-adjust" ? (
          <FaAdjust style={{ color: "#fd9c00", fontSize: "1.2rem" }} />
        ) : icon_class === "fa fa-circle-o" ? (
          <FaRegCircle style={{ color: "#e30713", fontSize: "1.2rem" }} />
        ) : (
          <></>
        )}
      </i>
      <div className="legend-text">{level}</div>
    </button>
  );
}

export default LEGEND_BTN;

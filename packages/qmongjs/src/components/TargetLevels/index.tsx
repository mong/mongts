import { useRef, useEffect } from "react";

import LEGEND_BTN from "./button";

import { useResizeObserver } from "../../helpers/hooks";
import styles from "./index.module.css";
import { app_text } from "../../app_config";

interface Props {
  update_show_level_filter(level: "high" | "moderate" | "low"): void;
  selection_bar_height: number | null;
  show_level_filter: string | undefined;
  update_legend_height(height: any): void;
  width: string;
}

function LEGEND(props: Props) {
  const {
    update_show_level_filter,
    show_level_filter,
    selection_bar_height,
    update_legend_height,
    width = "84%",
  } = props;
  const legend_ref = useRef<HTMLDivElement | null>(null);
  const dim = useResizeObserver(legend_ref);
  useEffect(() => {
    if (!dim) {
      return;
    }
    const top = (dim.target as HTMLElement).offsetHeight ?? null;
    update_legend_height(top);
  }, [dim, legend_ref, update_legend_height]);

  const legend_btns = Object.keys(app_text.indicators).map(function (
    this: any,
    level,
  ) {
    return (
      <LEGEND_BTN
        update_show_level_filter={update_show_level_filter}
        show_level_filter={show_level_filter}
        key={`${level}_legend_btn`}
        level={this[level].text}
        legend_btn_class={level}
      />
    );
  }, app_text.indicators);

  const style = { top: `${selection_bar_height}px`, width };

  return (
    <div className={styles.table_legend} ref={legend_ref} style={style}>
      {legend_btns}
    </div>
  );
}

export default LEGEND;

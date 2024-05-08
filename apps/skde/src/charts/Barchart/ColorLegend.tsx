import classNames from "./ChartLegend.module.css";

type ColorLegendProps = {
  colorScale: (args: string) => string;
  labels?: string[];
  onClick?: () => void;
  values: string[];
};

export const ColorLegend = ({
  colorScale,
  labels,
  values,
}: ColorLegendProps) => {
  return (
    <div className={classNames.legendContainer}>
      <ul className={classNames.legendUL}>
        {values.map((val, i) => (
          <li key={val + i} className={classNames.legendLI}>
            <div
              className={classNames.legendColorOuter}
              style={{
                border: `2px solid ${colorScale(val)}`,
              }}
            >
              <div
                className={classNames.legendColorInner}
                style={{
                  backgroundColor: colorScale(val),
                }}
              ></div>
            </div>
            {labels ? labels[i] : val}
          </li>
        ))}
      </ul>
    </div>
  );
};

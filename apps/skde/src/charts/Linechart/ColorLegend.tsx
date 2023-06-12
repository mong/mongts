import classNames from "../Barchart/ChartLegend.module.css";

type ColorLegendProps = {
  colorScale: Function;
  values: string[];
};

export const ColorLegend: React.FC<ColorLegendProps> = ({
  colorScale,
  values,
}) => {
  return (
    <div className={classNames.legendContainer}>
      <ul className={classNames.legendUL}>
        {values.map((val, i) => (
          <li key={val + i} className={classNames.legendLI}>
            <div
              style={{
                borderBottom: `4px solid ${colorScale(val)}`,
              }}
            >
              {val}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

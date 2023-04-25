import { Description, Indicator } from "types";

import BarChart, { Bar, BarStyle } from "../../Charts/BarChart";
import LineChart from "../../Charts/LineChart";
import { Level } from "../../Charts/types";
import { useIndicatorQuery } from "../../../helpers/hooks";

export interface Props {
  context: { context: string; type: string };
  svgContainerRef: React.RefObject<HTMLDivElement>;
  chartType: "bar" | "line";
  description: Description;
  treatmentYear: number;
  indicatorData: Indicator[];
  zoom: boolean;
  showLevel: boolean;
  levels: Level[];
  tickformat?: string;
  selectedTreatmentUnits: string[];
  max_value?: number;
  lastCompleteYear?: number;
}

function Chart(props: Props) {
  switch (props.chartType) {
    case "line":
      return <GetLineChart {...props} />;
    case "bar":
      return <GetBarChart {...props} />;
  }
}

export default Chart;

const GetBarChart: React.FC<Props> = (props) => {
  const { description, indicatorData, treatmentYear } = props;
  const registerShortName = description.rname ?? "";
  const {
    isLoading,
    error,
    data: indQryData,
  } = useIndicatorQuery({
    registerShortName: registerShortName,
    treatmentYear: treatmentYear,
    context: props.context.context,
    type: props.context.type,
  });

  if (isLoading) return <>Loading...</>;
  if (error) return <>An error has occured: {error.message}</>;

  // only keep data for given indicator
  const allIndicatorData = [...(indQryData ?? [])].filter(
    (data: Indicator) => data.ind_id === props.description.id
  );

  const showUnits = () => {
    // Show HF if there is less hospitals than HF
    // Show RHF if there is less HF than RHF
    const hospitalData = allIndicatorData.filter(
      (data: Indicator) => data.unit_level === "hospital"
    );
    const hfData = allIndicatorData.filter(
      (data: Indicator) => data.unit_level === "hf"
    );
    const rhfData = allIndicatorData.filter(
      (data: Indicator) => data.unit_level === "rhf"
    );

    return {
      hf: hospitalData.length < hfData.length,
      rhf: hfData.length < rhfData.length,
    };
  };

  // Units selected by user
  const unitNames = props.selectedTreatmentUnits;

  const filterData = (data: Indicator[]) => {
    const filtered = data
      .filter(
        (data: Indicator) =>
          data.ind_id === props.description.id &&
          ((data.dg ?? 1) >= 0.6 || data.unit_name === "Nasjonalt") &&
          data.denominator >= (description.min_denominator ?? 5)
      )
      .map((data: Indicator) => {
        const style: BarStyle = {};
        if (data.unit_name === "Nasjonalt") {
          style.color = "#00263D";
        } else {
          style.color = "#7EBEC7";
          if (props.selectedTreatmentUnits.length > 1) {
            style.opacity = unitNames.includes(data.unit_name) ? 1 : 0.5;
          }
        }
        return {
          label: data.unit_name,
          value: data.var,
          style,
        };
      })
      .sort((a: Bar, b: Bar) => b.value - a.value);
    return filtered ?? [];
  };

  const filterAllData = allIndicatorData.filter(
    (data: Indicator) =>
      !(
        // filter out data already selected by user
        (
          unitNames.includes(data.unit_name) ||
          // filter out HF if showHF() is false
          (data.unit_level === "hf" && !showUnits().hf) ||
          // filter out RHF if showRHF() is false
          (data.unit_level === "rhf" && !showUnits().rhf)
        )
      )
  );

  const barChartData = [...filterAllData, ...indicatorData];

  return <BarChart {...props} data={filterData(barChartData)} />;
};

const GetLineChart: React.FC<Props> = (props) => {
  const { description, selectedTreatmentUnits } = props;

  const {
    isLoading,
    error,
    data: indQryData,
  } = useIndicatorQuery({
    registerShortName: description.rname ?? "",
    unitNames: selectedTreatmentUnits,
    context: props.context.context,
    type: props.context.type,
  });

  if (isLoading) return <>Loading...</>;
  if (error) return <>An error has occured: {error.message}</>;

  // only keep data for given indicator
  const data = [...(indQryData ?? [])]
    .filter(
      (data: Indicator) =>
        data.ind_id === props.description.id &&
        ((data.dg ?? 1) >= 0.6 || data.unit_name === "Nasjonalt") &&
        data.denominator >= (description.min_denominator ?? 5)
    )
    .map((d: Indicator) => ({
      ...d,
      label: d.unit_name,
      value: d.var,
    }))
    .sort((a: Indicator, b: Indicator) => b.year - a.year);

  // get the last year with complete data
  const lastCompleteYear: number | undefined = data
    ? data[0].delivery_latest_affirm
      ? new Date(data[0].delivery_latest_affirm).getFullYear() - 1
      : undefined
    : undefined;

  return (
    <LineChart {...props} data={data} lastCompleteYear={lastCompleteYear} />
  );
};

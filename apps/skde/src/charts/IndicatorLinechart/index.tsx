import { useIndicatorQuery } from "qmongjs/src/helpers/hooks";
import LinechartBase, {LinechartData} from "../LinechartBase";

export declare interface IndicatorLinechartParams {
  registerShortName: string;
  unitNames: string[];
  unitLevel: "nation" | "rhf" | "hf" | "hospital";
  context: "caregiver" | "resident";
  type: "ind" | "dg";
  width?: number;
  height?: number
};

export const IndicatorLinechart = (indicatorParams: IndicatorLinechartParams) => {

  const {isFetching, data} = useIndicatorQuery(indicatorParams);

  if (isFetching) {
    return null;
  }

    const chartData: LinechartData[] = data
      .filter((row) => {return row.ind_id === "hjerneslag_beh_enhet"})
      .map((row) => { return { x: new Date(row.year, 0), y: row.var } as LinechartData });

    return <LinechartBase data={chartData} height={indicatorParams.height ?? 500} width={indicatorParams.width ?? 1000} />;
};

export default IndicatorLinechart;

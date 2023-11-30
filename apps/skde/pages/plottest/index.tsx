import IndicatorLinechart, {
  IndicatorLinechartParams,
} from "../../src/charts/IndicatorLinechart";

export const Skde = (): JSX.Element => {
  const indicatorParams: IndicatorLinechartParams = {
    registerShortName: "hjerneslag",
    unitNames: ["Tromsø"],
    unitLevel: "hospital",
    context: "caregiver",
    type: "ind",
  };

  return <div>
     <IndicatorLinechart {...indicatorParams} />
  </div>
};

export default Skde;

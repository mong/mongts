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
         <img
        className="figure"
        alt="Figure"
        src="/img/sykehusprofil/SKDE-innholdsboks1-sykehusprofil.png"
        />
     <IndicatorLinechart {...indicatorParams} />
     <img
        className="figure"
        alt="Figure"
        src="/img/sykehusprofil/SKDE-innholdsboks3-sykehusprofil.png"
        />
  </div>
};

export default Skde;

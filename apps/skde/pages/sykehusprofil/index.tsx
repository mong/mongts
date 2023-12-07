import IndicatorLinechart, {
  IndicatorLinechartParams,
} from "../../src/charts/IndicatorLinechart";
import { LineStyles } from "../../src/charts/LinechartBase";

export const Skde = (): JSX.Element => {
  const indicatorParams: IndicatorLinechartParams = {
    unitNames: ["Tromsø"],
    unitLevel: "hospital",
    context: "caregiver",
    type: "ind",
    width: 860,
    height: 400,
    lineStyles: new LineStyles(
      { text: "Høy måloppnåelse", strokeDash: "0", colour: "#3BAA34" },
      { text: "Moderat måloppnåelse", strokeDash: "1 3", colour: "#FD9C00" },
      { text: "Lav måloppnåelse", strokeDash: "8 8", colour: "#E30713" },
    ),
    startYear: 2017,
    endYear: 2022,
    yMin: 10,
  };

  return (
    <div>
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
  );
};

export default Skde;

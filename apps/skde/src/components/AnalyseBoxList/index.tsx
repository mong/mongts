import { AnalyseData } from "../../types";
import { AnalyseBox } from "../AnalyseBox";
import { useAnalyseFilter } from "../../helpers/hooks";


export const AnalyseBoxList = ({ analyser }: { analyser: AnalyseData[] }) => {
  const [tags, _] = useAnalyseFilter();

  const includeAnalyse = (analyse: AnalyseData) => {
    if (tags.size == 0 || analyse.tags.filter((tag) => tags.has(tag)).length > 0) {
      return true;
    }
  }

  return (
    <>
      {analyser.filter(includeAnalyse).map((a) => (
        <AnalyseBox analyse={a} key={a.name} />
      ))}
    </>
  );
};
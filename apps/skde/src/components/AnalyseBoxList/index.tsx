import { AnalyseData, Tag } from "../../types";
import { AnalyseBox } from "../AnalyseBox";
import { useAnalyseFilter } from "../../helpers/hooks";

export type AnalyseBoxListProps = {
  analyser: AnalyseData[],
  tagsMetadata: { [k: string]: Tag }
};

export const AnalyseBoxList = ({ analyser, tagsMetadata }: AnalyseBoxListProps) => {
  const [tags, _] = useAnalyseFilter();

  const includeAnalyse = (analyse: AnalyseData) => {
    if (tags.size == 0 || analyse.tags.filter((tag) => tags.has(tag)).length === tags.size) {
      return true;
    }
  }

  return (
    <>
      {analyser.filter(includeAnalyse).map((a) => (
        <AnalyseBox analyse={a} tagsMetadata={tagsMetadata} key={a.name} />
      ))}
    </>
  );
};
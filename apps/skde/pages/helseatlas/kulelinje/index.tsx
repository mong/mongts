import { useSearchParams } from "next/navigation";
import BeadLine from "../../../src/components/BeadLine";
import { FetchMap } from "../../../src/helpers/hooks";
import BeadLineSkeleton from "./beadLineSkeleton";
import getDataUrl from "../../../src/helpers/functions/getDataUrl";
import ensureValidLang from "../../../src/helpers/functions/ensureValidLang";
import queryResultPendingOrFailed from "../../../src/helpers/functions/queryResultPendingOrFailed";
import { useBohfSync } from "../../../src/helpers/hooks/useBohfSync";

export default function BeadLinePage() {
  useBohfSync();

  const searchParams = useSearchParams();
  const atlasParam = searchParams.get("atlas");
  const dataParam = searchParams.get("data");
  const langParam = searchParams.get("lang");
  const lang = ensureValidLang(langParam);

  const dataUrl = getDataUrl(atlasParam, dataParam);

  const dataFetchResult = FetchMap(dataUrl);

  if (queryResultPendingOrFailed(dataFetchResult)) {
    return <BeadLineSkeleton />;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const boxData: any = Object.values(dataFetchResult.data)[0];

  return <BeadLine boxData={boxData} lang={lang} />;
}

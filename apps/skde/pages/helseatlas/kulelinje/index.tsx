import { useSearchParams } from "next/navigation";
import { ThemeProvider } from "@mui/material";
import { skdeTheme } from "qmongjs";
import BeadLine from "../../../src/components/BeadLine";
import { FetchMap } from "../../../src/helpers/hooks";
import BeadLineSkeleton from "./beadLineSkeleton";
import getDataUrl from "../../../src/helpers/functions/getDataUrl";
import ensureValidLang from "../../../src/helpers/functions/ensureValidLang";
import queryResultPendingOrFailed from "../../../src/helpers/functions/queryResultPendingOrFailed";
import { useAreaSync } from "../../../src/helpers/hooks/useAreaSync";
import { AtlasDataItem } from "../../../src/types";

export default function BeadLinePage() {
  useAreaSync();

  const searchParams = useSearchParams();
  const atlasParam = searchParams.get("atlas");
  const dataParam = searchParams.get("data");
  const langParam = searchParams.get("lang");
  const lang = ensureValidLang(langParam);
  const dataUrl = getDataUrl(atlasParam, dataParam);

  const dataFetchResult = FetchMap(dataUrl || "");

  if (!dataUrl || queryResultPendingOrFailed(dataFetchResult)) {
    return <BeadLineSkeleton />;
  }

  const boxData: AtlasDataItem[] = dataFetchResult.data["innhold"];

  return (
    <ThemeProvider theme={skdeTheme}>
      <BeadLine boxData={boxData} lang={lang} />
    </ThemeProvider>
  );
}

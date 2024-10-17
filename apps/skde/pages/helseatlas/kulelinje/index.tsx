import { useSearchParams } from "next/navigation";
import Skeleton from "@mui/material/Skeleton";
import BeadLine from "../../../src/components/BeadLine";
import { FetchMap } from "../../../src/helpers/hooks";
import { Box } from "@mui/material";
import getFetchMapUrl from "../utils/getFetchMapUrl";
import ensureValidLang from "../utils/ensureValidLang";
import fetchMapPendingOrFailed from "../utils/fetchMapPendingOrFailed";

const skeleton = (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <Box maxWidth={900} width="100%">
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height={124}
      />
    </Box>
  </div>
);

export default function Kulelinje() {
  const searchParams = useSearchParams();
  const atlasParam = searchParams.get("atlas");
  const dataParam = searchParams.get("data");
  const langParam = searchParams.get("lang");
  const lang = ensureValidLang(langParam);

  const dataUrl = getFetchMapUrl(atlasParam, dataParam);

  const dataFetchResult = FetchMap(dataUrl);

  if (fetchMapPendingOrFailed(dataFetchResult)) {
    return skeleton;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const boxData: any = Object.values(dataFetchResult.data)[0];

  return <BeadLine boxData={boxData} lang={lang} />;
}

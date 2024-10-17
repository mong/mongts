import { useSearchParams } from "next/navigation";
import Skeleton from "@mui/material/Skeleton";
import BeadLine from "../../../src/components/BeadLine";
import { FetchMap } from "../../../src/helpers/hooks";
import { Box } from "@mui/material";

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

const ensureValidLang = (
  langString: string | null | undefined,
): "nb" | "nn" | "en" => {
  if (langString === "nn" || langString === "en") {
    return langString;
  }
  return "nb"; // Default to Norwegian Bokmål if not "nn" or "en"
};

const getDataUrl = (atlasParam: string | null, dataParam: string | null) => {
  return dataParam && atlasParam
    ? `/helseatlas/data/${atlasParam}/${dataParam}.json`
    : null;
};

export default function Kulelinje() {
  const searchParams = useSearchParams();
  const atlasParam = searchParams.get("atlas");
  const dataParam = searchParams.get("data");
  const langParam = searchParams.get("lang");
  const lang = ensureValidLang(langParam);

  const dataUrl = getDataUrl(atlasParam, dataParam);

  const dataFetchResult = FetchMap(dataUrl);

  if (
    dataFetchResult === null ||
    !dataFetchResult.isFetched ||
    !dataUrl ||
    dataFetchResult.isError
  ) {
    return skeleton;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const boxData: any = Object.values(dataFetchResult.data)[0];

  return <BeadLine boxData={boxData} lang={lang} />;
}

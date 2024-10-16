import Skeleton from "@mui/material/Skeleton";
import BeadLine from "../../../src/components/BeadLine";
import { FetchMap } from "../../../src/helpers/hooks";

export default function Kulelinje() {
  const lang = "nb";
  const res = FetchMap(`/helseatlas/data/lab/mb_rb2.json`);

  if (!res.isFetched) {
    return <Skeleton></Skeleton>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const boxData: any = Object.values(res.data)[0];

  return <BeadLine boxData={boxData} lang={lang} />;
}

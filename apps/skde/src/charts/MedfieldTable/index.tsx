import { UseQueryResult } from "@tanstack/react-query";
import { useIndicatorQuery } from "qmongjs";
import { LinechartBackground } from "../LinechartBase/LinechartBaseStyles";

export type MedfieldTableProps = {
  unitNames: string[];
  treatmentYear: number;
  context: string;
  type: string;
  width: number;
  height: number;
};

export const MedfieldTable = (medfieldTableParams: MedfieldTableProps) => {

  // Fetch aggregated data
  const indicatorQuery: UseQueryResult<any, unknown> =
  useIndicatorQuery(medfieldTableParams);

  if (indicatorQuery.isFetching) {
    return null;
  }

  console.log(indicatorQuery.data)

  // Trenger register-id og fagområde

  return(
      <div>
        <svg id="medfieldtable" width={medfieldTableParams.width} height={medfieldTableParams.height}>
          <LinechartBackground id="medfieldtablebackground" width={medfieldTableParams.width} height={medfieldTableParams.height} />
        </svg>
      </div>
  );
};

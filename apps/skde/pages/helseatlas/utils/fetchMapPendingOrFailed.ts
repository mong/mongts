import { UseQueryResult } from "@tanstack/react-query";

export default function fetchMapPendingOrFailed(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataFetchResult: UseQueryResult<any, Error>,
): boolean {
  return (
    !dataFetchResult || !dataFetchResult.isFetched || dataFetchResult.isError
  );
}

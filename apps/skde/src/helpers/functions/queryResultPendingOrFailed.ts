import { UseQueryResult } from "@tanstack/react-query";

/**
 * Checks if the given query result is either not yet fetched or has failed.
 *
 * If the result is not yet fetched, then `dataFetchResult` is `undefined` or
 * `dataFetchResult.isFetched` is `false`. If the result has failed, then
 * `dataFetchResult.isError` is `true`.
 *
 * @param dataFetchResult The result of a query from `useQuery` or similar.
 * @returns `true` if the result is pending or failed, `false` if it is successful.
 */
export default function queryResultPendingOrFailed(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataFetchResult: UseQueryResult<any, Error>,
): boolean {
  return (
    !dataFetchResult || !dataFetchResult.isFetched || dataFetchResult.isError
  );
}

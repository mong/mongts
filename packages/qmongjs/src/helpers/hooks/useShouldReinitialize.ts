import { UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const anyQueriesLoading = (queries: UseQueryResult<any, unknown>[]) => {
  return queries.some((query) => query.isLoading);
};

/**
 *
 * @param queries An array of tanstack queries of type UseQueryResults
 * @returns True when the page is hydrated and all queries have finished loading, but
 * only if the page and calls were pending when the hook first was called
 */
export default function useShouldReinitialize(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queries: UseQueryResult<any, unknown>[],
) {
  const router = useRouter();

  const [previousPrerenderingStatus, setPreviousPrerenderingStatus] = useState(router.isReady);

  const prerenderingJustCompleted = previousPrerenderingStatus !== router.isReady;

  useEffect(() => {
    setPreviousPrerenderingStatus(router.isReady);
  }, [router.isReady]);

  const areQueriesStillLoading = anyQueriesLoading(queries);

  const [previousQueryLoadingStatus, setPreviousQueryLoadingStatus] = useState(
    areQueriesStillLoading,
  );

  const queriesJustCompleted = previousQueryLoadingStatus && !anyQueriesLoading(queries);

  useEffect(() => {
    setPreviousQueryLoadingStatus(areQueriesStillLoading);
  }, [areQueriesStillLoading]);

  return (prerenderingJustCompleted && !areQueriesStillLoading) || queriesJustCompleted;
}

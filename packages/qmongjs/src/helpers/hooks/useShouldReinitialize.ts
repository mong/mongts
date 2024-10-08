import { UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const anyQueriesLoading = (queries: UseQueryResult<any, unknown>[]) => {
  return queries.some((query) => query.isLoading);
};

/**
 *
 * The variable from useShouldReinitialize becomes true either:
 * 1) The first time the page has finished "pre-rendering" and the API calls have already finished loading. At this point, the query/get parameters from the URL are also ready.
 * 2) The first time the API calls finish loading and the page is already "pre-rendered". That is, pre-rendering finishes first and then the API calls. At this point, the query/get parameters from the URL are also ready.
 *
 * @param queries An array of tanstack queries of type UseQueryResults
 * @returns True the first time the page is finished hydrated and all queries have finished loading
 */
export default function useShouldReinitialize(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queries: UseQueryResult<any, unknown>[],
) {
  const router = useRouter();

  const [previousPrerenderingStatus, setPreviousPrerenderingStatus] = useState(
    router.isReady,
  );

  const prerenderingJustCompleted =
    previousPrerenderingStatus !== router.isReady;

  useEffect(() => {
    setPreviousPrerenderingStatus(router.isReady);
  }, [router.isReady]);

  const areQueriesStillLoading = anyQueriesLoading(queries);

  const [previousQueryLoadingStatus, setPreviousQueryLoadingStatus] = useState(
    areQueriesStillLoading,
  );

  const queriesJustCompleted =
    previousQueryLoadingStatus && !anyQueriesLoading(queries);

  useEffect(() => {
    setPreviousQueryLoadingStatus(areQueriesStillLoading);
  }, [areQueriesStillLoading]);

  return (
    (prerenderingJustCompleted && !areQueriesStillLoading) ||
    queriesJustCompleted
  );
}

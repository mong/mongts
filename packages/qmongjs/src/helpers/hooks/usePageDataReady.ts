import { UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const queriesLoading = (queries: UseQueryResult<any, unknown>[]) => {
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

  const [prevReady, setPrevReady] = useState(router.isReady);

  const prerenderFinished = prevReady !== router.isReady;

  useEffect(() => {
    setPrevReady(router.isReady);
  }, [router.isReady]);

  const [prevApiQueriesLoading, setPrevApiQueriesLoading] = useState(
    queriesLoading(queries),
  );

  const apiQueriesCompleted = prevApiQueriesLoading && !queriesLoading(queries);

  useEffect(() => {
    setPrevApiQueriesLoading(queriesLoading(queries));
  }, [queriesLoading(queries)]);

  return prerenderFinished || apiQueriesCompleted;
}

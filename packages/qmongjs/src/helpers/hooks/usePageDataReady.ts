import { UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const queriesLoading = (queries: UseQueryResult<any, unknown>[]) => {
  return queries.some((query) => query.isLoading);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useShouldReinitialize(
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

import { UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const queriesLoading = (queries: UseQueryResult<any, unknown>[]) => {
  return queries.some(query => query.isLoading);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function usePageDataReady(queries: UseQueryResult<any, unknown>[]) {
  // When the user navigates to the page, it may contain query parameters for
  // filtering indicators. Use NextRouter to get the current path containing the
  // initial query parameters.
  const router = useRouter();
  
  // Next's prerender stage causes problems for the initial values given to
  // useReducer, because they are only set once by the reducer and are missing
  // during Next's prerender stage. Tell FilterMenu to refresh its state during
  // the first call after the prerender is done.
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
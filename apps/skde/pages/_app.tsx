import "../src/styles/globals.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { QueryParamProvider } from "use-query-params";
import { NextAdapter } from "next-query-params";
import { ReactQueryDevtools } from "react-query/devtools";
import type { AppProps } from "next/app";
import { Open_Sans } from "@next/font/google";

const open_sans = Open_Sans({
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <main className={open_sans.className}>
      <QueryParamProvider adapter={NextAdapter}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </QueryParamProvider>
    </main>
  );
}

export default MyApp;

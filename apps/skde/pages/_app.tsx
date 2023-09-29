import "../src/styles/globals.css";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryParamProvider } from "use-query-params";
import { NextAdapter } from "next-query-params";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { Open_Sans } from "next/font/google";
import { useRouter } from "next/router";

const open_sans = Open_Sans({
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const { pathname } = useRouter();
  const lang =
    pathname.includes("/en/") || pathname.endsWith("/en") ? "en" : "no";
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    var _mtm = (window._mtm = window._mtm || []);
    _mtm.push({ "mtm.startTime": new Date().getTime(), event: "mtm.Start" });
    var d = document,
      g = d.createElement("script"),
      s = d.getElementsByTagName("script")[0];
    g.async = true;
    g.src = "https://matomo.skde.org/js/container_hZ91wYd2.js";
    s.parentNode.insertBefore(g, s);
  }, []);

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

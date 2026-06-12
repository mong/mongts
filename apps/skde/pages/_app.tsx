import { LicenseInfo } from "@mui/x-license";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter } from "next/router";
import { NextAdapter } from "next-query-params";
import { useEffect, useState } from "react";
import { QueryParamProvider } from "use-query-params";
import "../app/global.css";
import "@mong/material-ui/index.css"; //Denne må nederst
import {
  Breadcrumbs,
  Footer,
  Header,
  MainLayout,
  PageLayout,
  SkdeThemeProvider,
} from "@mong/material-ui";
import type { AppProps } from "next/app";

type Languages = "en" | "no";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const { pathname } = useRouter();
  const pathLang =
    pathname.includes("/en/") || pathname.endsWith("/en") ? "en" : "no";
  // Do not show header and footer on the stadievurdering page
  const applyLayout = !pathname.includes("stadievurdering");

  useEffect(() => {
    document.documentElement.lang = pathLang;
  }, [pathLang]);

  const [lang, setLang] = useState<Languages>(pathLang);

  LicenseInfo.setLicenseKey(process.env.NEXT_PUBLIC_MUI_X_LICENSE_KEY || "");

  return (
    <main className={`min-h-full flex flex-col antialiased`}>
      {applyLayout ? (
        <SkdeThemeProvider>
          <MainLayout>
            <Header
              lang={lang}
              onLangChange={(lang) => setLang(lang as Languages)}
            />
            <Breadcrumbs
              leading={[{ name: "Analyseverktøy", href: "/" }]}
              pathname={pathname}
            />
            <PageLayout>
              <QueryParamProvider adapter={NextAdapter}>
                <QueryClientProvider client={queryClient}>
                  <Component {...pageProps} />
                  <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
              </QueryParamProvider>
            </PageLayout>
            <Footer lang={lang} />
          </MainLayout>
        </SkdeThemeProvider>
      ) : (
        <SkdeThemeProvider>
          <QueryParamProvider adapter={NextAdapter}>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </QueryParamProvider>
        </SkdeThemeProvider>
      )}
    </main>
  );
}

export default MyApp;

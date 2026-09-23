"use client";

import {
  Breadcrumbs,
  Footer,
  Header,
  MainLayout,
  PageLayout,
  SkdeThemeProvider,
} from "@mong/material-ui";
import { LicenseInfo } from "@mui/x-license";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname } from "next/navigation";
import NextAdapterApp from "next-query-params/app";
import { type ReactNode, Suspense, useEffect, useState } from "react";
import { QueryParamProvider } from "use-query-params";

type Languages = "en" | "no";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname() ?? "/";
  const pathLang =
    pathname.includes("/en/") || pathname.endsWith("/en") ? "en" : "no";
  const isLandingPage = pathname === "/";
  const applyLayout =
    !pathname.includes("stadievurdering") && !pathname.includes("stadietabell");

  useEffect(() => {
    document.documentElement.lang = pathLang;
  }, [pathLang]);

  const [lang, setLang] = useState<Languages>(pathLang);

  LicenseInfo.setLicenseKey(process.env.NEXT_PUBLIC_MUI_X_LICENSE_KEY || "");

  const content = (
    <Suspense fallback={null}>
      <QueryParamProvider adapter={NextAdapterApp}>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </QueryParamProvider>
    </Suspense>
  );

  return (
    <SkdeThemeProvider>
      {applyLayout ? (
        <MainLayout>
          <Header
            lang={lang}
            onLangChange={(lang) => setLang(lang as Languages)}
          />
          {!isLandingPage && (
            <Breadcrumbs
              leading={[{ name: "Analyseverktøy", href: "/" }]}
              pathname={pathname}
            />
          )}
          <PageLayout>{content}</PageLayout>
          <Footer lang={lang} />
        </MainLayout>
      ) : (
        content
      )}
    </SkdeThemeProvider>
  );
}

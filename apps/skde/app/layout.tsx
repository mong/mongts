import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./global.css";
import { materialSymbolsOutlined } from "@/fonts/materialSymbolsOutlined";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "SKDE analyseverktøy",
  description:
    "Oversikt over kvalitet, resultater og variasjon i helsetjenesten.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    siteName: "Helse Nord RHF",
  },
  verification: {
    google: "XnhRhaBwfeuAccfCFysPPpe1f49t46JAfInHBDfK6HE",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="no">
      <body>
        <main
          className={`${materialSymbolsOutlined.variable} min-h-full flex flex-col antialiased`}
        >
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./global.css";
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
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap&icon_names=arrow_circle_down"
        />
      </head>
      <body>
        <main className="min-h-full flex flex-col antialiased">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}

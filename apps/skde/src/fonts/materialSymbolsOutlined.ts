import localFont from "next/font/local";

// Self-hosted via next/font/local: Material Symbols Outlined isn't part of
// the next/font/google catalog, so the file is downloaded from Google Fonts
// and served locally instead (subset to the "arrow_circle_down" icon).
export const materialSymbolsOutlined = localFont({
  src: "./material-symbols-outlined.woff2",
  variable: "--font-material-symbols-outlined",
  display: "swap",
  weight: "100 700",
  style: "normal",
});

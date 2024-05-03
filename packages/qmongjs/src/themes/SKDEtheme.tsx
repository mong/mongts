import { Plus_Jakarta_Sans } from "next/font/google";
import { createTheme } from "@mui/material";

const plus_jakarta_sans = Plus_Jakarta_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const jakarta_style = plus_jakarta_sans.style;

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    desktop: true;
  }
}

const fonts = {
  H1: {
    fontFamily: `${jakarta_style.fontFamily}`,
    fontWeight: "300",
    fontSize: "64px",
    letterSpacing: "-1.5px",
  },
  H2: {
    fontFamily: `${jakarta_style.fontFamily}`,
    fontWeight: "300",
    fontSize: "48px",
    letterSpacing: "-0.5px",
  },
  H3: {
    fontFamily: `${jakarta_style.fontFamily}`,
    fontWeight: "400",
    fontSize: "40px",
    letterSpacing: "0px",
  },
  H4: {
    fontFamily: `${jakarta_style.fontFamily}`,
    fontWeight: "400",
    fontSize: "32px",
    letterSpacing: "0.25px",
  },
  H5: {
    fontFamily: `${jakarta_style.fontFamily}`,
    fontWeight: "400",
    fontSize: "28px",
    letterSpacing: "0px",
  },
  H6: {
    fontFamily: `${jakarta_style.fontFamily}`,
    fontWeight: "500",
    fontSize: "24px",
    letterSpacing: "0.15px",
  },
  S1: {
    fontFamily: `${jakarta_style.fontFamily}`,
    fontWeight: "400",
    fontSize: "20px",
    letterSpacing: "0.15px",
  },
  S2: {
    fontFamily: `${jakarta_style.fontFamily}`,
    fontWeight: "500",
    fontSize: "20px",
    letterSpacing: "0.1px",
  },
  B1: {
    fontFamily: `${jakarta_style.fontFamily}`,
    fontWeight: "400",
    fontSize: "18px",
    letterSpacing: "0.5px",
  },
  B2: {
    fontFamily: `${jakarta_style.fontFamily}`,
    fontWeight: "400",
    fontSize: "14px",
    letterSpacing: "0.25px",
  },
  BUTT: {
    fontFamily: `${jakarta_style.fontFamily}`,
    fontWeight: "500",
    fontSize: "16px",
    letterSpacing: "1.25px",
  },
  OVER: {
    fontFamily: `${jakarta_style.fontFamily}`,
    fontWeight: "500",
    fontSize: "14px",
    letterSpacing: "1.5px",
  },
};

const breakpoints = {
  XS: 0,
  MD: 768,
  LG: 992,
  XL: 1080,
  XXL: 1408,
};

// const spacingScale = {
//   XXXS: "2px",
//   XXS: "4px",
//   XS: "8px",
//   SM: "12px",
//   MD: "16px",
//   LG: "24px",
//   XL: "32px",
//   XXL: "48px",
//   XXXL: "64px",
//   XXXXL: "80px",
//   XXXXXL: "96px",
//   XXXXXXL: "112px",
//   XXXXXXXL: "128px",
// };

const colourTokens = {
  Primary: {
    main: "#BFCED6",
    light: "#E3EBF2",
    dark: "#748C9B",
  },

  Secondary: {
    main: "#BFC7E4",
    light: "#E6E9F4",
    dark: "#003087",
  },

  Background: {
    main: "#DEDEDE",
    light: "#F4F4F4",
    dark: "#9B9B9B",
  },

  Surface: {
    main: "#5E7680",
    light: "#E0E7EB",
    dark: "#173844",
  },

  Surface2: {
    main: "#399568",
    light: "#E0EBE5",
    dark: "#00531E",
  },

  Text: {
    disabled: "#F5F5F5",
    secondary: "#C4C4C4",
    primary: "#002F87",
  },

  Success: {
    main: "#ADD9B1",
    light: "#EAF6EB",
    dark: "#002F87",
  },

  Info: {
    main: "#FEF17F",
    light: "#FFFAC8",
    dark: "#FFC745",
  },

  Error: {
    main: "#DD747A",
    light: "#FDEBEF",
    dark: "#CB333B",
  },
};

export const SKDEtheme = createTheme({
  typography: {
    h1: fonts.H1,
    h2: fonts.H2,
    h3: fonts.H3,
    h4: fonts.H4,
    h5: fonts.H5,
    h6: fonts.H6,
    body1: fonts.B1,
    body2: fonts.B2,
    subtitle1: fonts.S1,
    subtitle2: fonts.S2,
    button: fonts.BUTT,
    overline: fonts.OVER,
  },
  palette: {
    mode: "light",
    primary: colourTokens.Primary,
    secondary: colourTokens.Secondary,
    error: colourTokens.Error,
    success: colourTokens.Success,
    text: colourTokens.Text,
    info: colourTokens.Info,
  },
  breakpoints: {
    values: {
      xs: breakpoints.XS,
      sm: breakpoints.MD,
      md: breakpoints.XL,
      lg: breakpoints.LG,
      xl: breakpoints.XXL,
      desktop: 1300,
    },
  },
});

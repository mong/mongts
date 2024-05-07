import { Plus_Jakarta_Sans } from "next/font/google";
import { createTheme, responsiveFontSizes } from "@mui/material";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const jakartaStyle = plusJakartaSans.style;

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
  h1: {
    fontFamily: `${jakartaStyle.fontFamily}`,
    fontWeight: "300",
    fontSize: "64px",
    letterSpacing: "-1.5px",
  },
  h2: {
    fontFamily: `${jakartaStyle.fontFamily}`,
    fontWeight: "300",
    fontSize: "48px",
    letterSpacing: "-0.5px",
  },
  h3: {
    fontFamily: `${jakartaStyle.fontFamily}`,
    fontWeight: "400",
    fontSize: "40px",
    letterSpacing: "0px",
  },
  h4: {
    fontFamily: `${jakartaStyle.fontFamily}`,
    fontWeight: "400",
    fontSize: "32px",
    letterSpacing: "0.25px",
  },
  h5: {
    fontFamily: `${jakartaStyle.fontFamily}`,
    fontWeight: "400",
    fontSize: "28px",
    letterSpacing: "0px",
  },
  h6: {
    fontFamily: `${jakartaStyle.fontFamily}`,
    fontWeight: "500",
    fontSize: "24px",
    letterSpacing: "0.15px",
  },
  s1: {
    fontFamily: `${jakartaStyle.fontFamily}`,
    fontWeight: "400",
    fontSize: "20px",
    letterSpacing: "0.15px",
  },
  s2: {
    fontFamily: `${jakartaStyle.fontFamily}`,
    fontWeight: "500",
    fontSize: "20px",
    letterSpacing: "0.1px",
  },
  b1: {
    fontFamily: `${jakartaStyle.fontFamily}`,
    fontWeight: "400",
    fontSize: "18px",
    letterSpacing: "0.5px",
  },
  b2: {
    fontFamily: `${jakartaStyle.fontFamily}`,
    fontWeight: "400",
    fontSize: "14px",
    letterSpacing: "0.25px",
  },
  button: {
    fontFamily: `${jakartaStyle.fontFamily}`,
    fontWeight: "500",
    fontSize: "16px",
    letterSpacing: "1.25px",
    textTransform: "none",
  },
  over: {
    fontFamily: `${jakartaStyle.fontFamily}`,
    fontWeight: "500",
    fontSize: "14px",
    letterSpacing: "1.5px",
  },
};

const breakpoints = {
  xs: 0,
  md: 768,
  lg: 992,
  xl: 1080,
  xxl: 1408,
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

const colorTokens = {
  primary: {
    main: "#003087", // "#bfced6",
    light: "#e0e7eb", // "#bfced6", // "#e3ebf2",
    dark: "#173844",
  },

  secondary: {
    main: "#003087", //"#001b52", //"#003087", // "#bfc7e4",
    light: "#e6e9f4",
    dark: "#003087",
  },

  background: {
    main: "#dedede",
    light: "#f4f4f4",
    dark: "#9b9b9b",
  },

  surface: {
    main: "#5e7680",
    light: "#e0e7eb",
    dark: "#173844",
  },

  surface2: {
    main: "#399568",
    light: "#e0ebe5",
    dark: "#00531e",
  },

  text: {
    primary: "#001b52",
    secondary: "#c4c4c4",
    disabled: "#f5f5f5",
  },

  success: {
    main: "#add9b1",
    light: "#eaf6eb",
    dark: "#002f87",
  },

  info: {
    main: "#fef17f",
    light: "#fffac8",
    dark: "#ffc745",
  },

  error: {
    main: "#dd747a",
    light: "#fdebef",
    dark: "#cb333b",
  },
};

export const SkdeTheme = responsiveFontSizes(
  createTheme({
    typography: {
      h1: fonts.h1,
      h2: fonts.h2,
      h3: fonts.h3,
      h4: fonts.h4,
      h5: fonts.h5,
      h6: fonts.h6,
      body1: fonts.b1,
      body2: fonts.b2,
      subtitle1: fonts.s1,
      subtitle2: fonts.s2,
      button: fonts.button,
      overline: fonts.over,
    },
    palette: {
      mode: "light",
      primary: colorTokens.primary,
      secondary: colorTokens.secondary,
      error: colorTokens.error,
      success: colorTokens.success,
      text: colorTokens.text,
      info: colorTokens.info,
      background: {
        paper: colorTokens.background.light,
      },
    },
    breakpoints: {
      values: {
        xs: breakpoints.xs,
        sm: breakpoints.md,
        md: breakpoints.xl,
        lg: breakpoints.lg,
        xl: breakpoints.xxl,
        desktop: 1300,
      },
    },
  }),
);

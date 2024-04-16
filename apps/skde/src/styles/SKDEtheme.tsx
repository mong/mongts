import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    table: {
      margin: number;
      border: number;
      rowgap: number;
      gap: number;
    };
  }

  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    desktop: true;
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    table?: {
      margin: number;
      border: number;
      rowgap: number;
      gap: number;
    };
  }
}

const fonts = {
  H1: {
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "Light",
    fontSize: "64px",
    letterSpacing: "-1.5px",
  },
  H2: {
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "Light",
    fontSize: "48px",
    letterSpacing: "-0.5px",
  },
  H3: {
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "Light",
    fontSize: "48px",
    letterSpacing: "-0.5px",
  },
  H4: {
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "Light",
    fontSize: "48px",
    letterSpacing: "-0.5px",
  },
  H5: {
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "Light",
    fontSize: "48px",
    letterSpacing: "-0.5px",
  },
  H6: {
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "Light",
    fontSize: "48px",
    letterSpacing: "-0.5px",
  },
  S1: {
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "Light",
    fontSize: "48px",
    letterSpacing: "-0.5px",
  },
  S2: {
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "Light",
    fontSize: "48px",
    letterSpacing: "-0.5px",
  },
  B1: {
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "Light",
    fontSize: "48px",
    letterSpacing: "-0.5px",
  },
  B2: {
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "Light",
    fontSize: "48px",
    letterSpacing: "-0.5px",
  },
  BUTT: {
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "Light",
    fontSize: "48px",
    letterSpacing: "-0.5px",
  },
  OVER: {
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "Light",
    fontSize: "48px",
    letterSpacing: "-0.5px",
  },
};

const breakpoints = {
  XS: 0,
  MD: 768,
  LG: 992,
  XL: 1080,
  XXL: 1408,
};

const spacingScale = {
  XXXS: "2px",
  XXS: "4px",
  XS: "8px",
  SM: "12px",
  MD: "16px",
  LG: "24px",
  XL: "32px",
  XXL: "48px",
  XXXL: "64px",
  XXXXL: "80px",
  XXXXXL: "96px",
  XXXXXXL: "112px",
  XXXXXXXL: "128px",
};

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
    disabled: "#C4C4C4",
    secondary: "#F5F5F5",
    primary: "#003087",
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

const SKDEtheme = createTheme({
  typography: {
    h1: fonts.H1,
    h2: fonts.H2,
    h3: fonts.H3,
    h4: fonts.H4,
    h5: fonts.H5,
    h6: fonts.H6,
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
  spacing: 10,
  table: {
    margin: 0,
    border: 100,
    gap: 40,
    rowgap: 40,
  },
});

export default SKDEtheme;

import { createTheme, styled, Table, TableCell, TableRow } from "@mui/material";
import { skdeTheme } from "../../../themes/SkdeTheme";

declare module "@mui/material/styles" {
  interface Theme {
    table: {
      margin: number;
    };
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    table?: {
      margin: number;
    };
  }
}

export const indicatorTableTheme = createTheme({
  ...skdeTheme,
  table: {
    margin: 10,
  },
});

export const StyledTable = styled(Table)(({ theme }) => ({
  margin: theme.table.margin,
}));

export const StyledTableRow = styled(TableRow)(() => ({
  color: "#FFFFFF",
}));

export const StyledTableCell = styled(TableCell)(() => ({
  borderTopRightRadius: "8px",
  borderBottomRightRadius: "8px",
  borderTopLeftRadius: "8px",
  borderBottomLeftRadius: "8px",
  backgroundColor: "#FFFFFF",
}));

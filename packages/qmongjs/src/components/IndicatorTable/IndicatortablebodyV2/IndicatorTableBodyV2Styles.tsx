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

export const StyledTable = styled(Table)(() => ({
  margin: 0,
  tableLayout: "fixed",
  width: "95%",
  wordBreak: "break-word",
}));

export const StyledTableRow = styled(TableRow)(() => ({
  color: "#FFFFFF",
}));

export const StyledTableCell = styled(TableCell)(() => ({
  borderTopRightRadius: "0.5rem",
  borderBottomRightRadius: "0.5rem",
  borderTopLeftRadius: "0.5rem",
  borderBottomLeftRadius: "0.5rem",
  backgroundColor: "#FFFFFF",
  borderColor: skdeTheme.palette.background.paper,
  fontSize: "1rem",
}));

export const StyledTableCellStart = styled(TableCell)(() => ({
  borderTopLeftRadius: "0.5rem",
  borderBottomLeftRadius: "0.5rem",
  backgroundColor: "#FFFFFF",
  borderColor: skdeTheme.palette.background.paper,
  fontSize: "1rem",
}));

export const StyledTableCellEnd = styled(TableCell)(() => ({
  borderTopRightRadius: "0.5rem",
  borderBottomRightRadius: "0.5rem",
  backgroundColor: "#FFFFFF",
  borderColor: skdeTheme.palette.background.paper,
  fontSize: "1rem",
}));

export const StyledTableCellMiddle = styled(TableCell)(() => ({
  backgroundColor: "#FFFFFF",
  borderColor: skdeTheme.palette.background.paper,
  fontSize: "1rem",
}));

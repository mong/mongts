import { styled, Table, TableCell, TableRow } from "@mui/material";

export const StyledTable = styled(Table)(({ theme }) => ({
  margin: theme.table.margin,
  borderCollapse: "separate !important",
  borderSpacing: "1px 4px !important",
  backgroundColor: "#F5F5F5",
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  color: "#FFFFFF",
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderTopRightRadius: "8px",
  borderBottomRightRadius: "8px",
  borderTopLeftRadius: "8px",
  borderBottomLeftRadius: "8px",
  backgroundColor: "#FFFFFF",
}));

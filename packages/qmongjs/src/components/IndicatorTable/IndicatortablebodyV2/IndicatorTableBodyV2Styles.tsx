import { styled, Table, TableCell, TableRow } from "@mui/material";

export const StyledTable = styled(Table)(({ theme }) => ({
  margin: theme.table.margin,
  borderCollapse: "separate !important",
  borderSpacing: "2px 5px !important",
  backgroundColor: "#A5A5A5",
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  borderTopLeftRadius: "20px",
  backgroundColor: "#F5F5F5",
  color: "#FFFFFF",
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderTopRightRadius: "8px",
  borderBottomRightRadius: "8px",
  borderTopLeftRadius: "8px",
  borderBottomLeftRadius: "8px",
  backgroundColor: "#F5F5F5",
}));

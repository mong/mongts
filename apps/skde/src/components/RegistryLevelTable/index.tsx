import { useRegistryRankQuery } from "qmongjs";
import { Table, TableRow, TableCell } from "@mui/material";
import { RegistryRank } from "types";

type RegistryLevelTableProps = {
  year: number;
};

export const RegistryLevelTable = (props: RegistryLevelTableProps) => {
  const { year } = props;

  const rankQuery = useRegistryRankQuery(year);

  if (rankQuery.isFetching) {
    return null;
  }

  return (
    <Table>
      {rankQuery.data.map((row: RegistryRank) => {
        return (
          <TableRow key={"Rank-" + row.id}>
            <TableCell>{row.short_name}</TableCell>
            <TableCell>{row.verdict}</TableCell>
          </TableRow>
        );
      })}
    </Table>
  );
};

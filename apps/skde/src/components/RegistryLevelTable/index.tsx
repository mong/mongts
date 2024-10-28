import { useRegistryRankQuery } from "qmongjs";
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@mui/material";
import { RegistryRank } from "types";
import _ from "lodash";
import { ArrowLink } from "qmongjs";

type RegistryLevelTableProps = {
  year: number;
  numberOfYears: number;
};

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

export const RegistryLevelTable = (props: RegistryLevelTableProps) => {
  const { year, numberOfYears } = props;

  const rankQuery = useRegistryRankQuery();

  if (rankQuery.isFetching) {
    return null;
  }

  const filteredData = rankQuery.data.filter((row) => {
    return row.year > year - numberOfYears;
  }) as RegistryRank[];

  const registries = filteredData
    .map((row) => row.full_name)
    .filter(onlyUnique);
  const years = filteredData
    .map((row) => row.year)
    .filter(onlyUnique)
    .sort();

  const tableData = registries.map((reg) => {
    // Filter on registry
    const data = filteredData.filter((row) => row.full_name === reg);
    const url = data[0].url;

    // Make array of verdicts
    const verdicts = years.map((year) => {
      // Filter on year
      const dataRow = data.filter((row2) => {
        return row2.year === year;
      });

      return dataRow[0] ? dataRow[0].verdict : "";
    });

    return { registry: reg, url: url, verdicts: verdicts };
  }) as { registry: string; url: string; verdicts: string[] }[];

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Register</TableCell>
          {years.map((year) => {
            return <TableCell key={"tablehead-" + year}>{year}</TableCell>;
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData.map((row) => {
          return (
            <TableRow key={"Rank-" + row.registry}>
              <TableCell>
                {
                  <ArrowLink
                    href={row.url}
                    text={row.registry}
                    externalLink={true}
                    button={false}
                  />
                }
              </TableCell>

              {_.range(numberOfYears).map((i) => {
                return (
                  <TableCell key={"year-" + i}>{row.verdicts[i]}</TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

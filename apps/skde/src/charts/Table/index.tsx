import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { getOrderComparator } from "../../helpers/functions/dataTransformation";
import { customFormat } from "qmongjs";
import { useAreaQueryParam } from "../../helpers/hooks";
import { Markdown } from "../../components/Markdown";
import { nationalLabel } from "../colors";
import { DataItemPoint } from "../../types";

type DataTableProps = {
  caption: string;
  data: DataItemPoint[];
  headers: {
    id: string;
    label_no: string;
    label_en: string;
    typeVar: "number" | "string";
    format?: string;
  }[];
  lang: "en" | "nb" | "nn";
  areaType: string;
  national: string;
};

export const DataTable = ({
  caption,
  data,
  headers,
  lang,
  areaType,
  national,
}: DataTableProps) => {
  // Pick out area query from the url
  const [selectedAreas, toggleArea] = useAreaQueryParam(national, areaType);

  const [order, setOrder] = React.useState<"asc" | "desc">("desc");
  const [orderBy, setOrderBy] = React.useState(headers[1].id);
  const createSortHandler = (property) => () => {
    (() => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    })();
  };
  return (
    <TableContainer>
      <Table>
        <caption>
          <Markdown lang={lang}>{caption}</Markdown>
        </caption>
        <TableHead>
          <TableRow>
            {headers.map((header, i) => (
              <TableCell
                key={`${header.id}${i}`}
                align={header.typeVar === "number" ? "right" : "left"}
                padding={"none"}
                sx={{ fontSize: "0.875rem" }}
                sortDirection={orderBy === header.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === header.id}
                  direction={orderBy === header.id ? order : "asc"}
                  onClick={createSortHandler(header.id)}
                  sx={{ fontWeight: 600 }}
                  data-testid={`tablehead_${header.id}`}
                >
                  {lang === "en" ? header.label_en : header.label_no}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {[...data]
            .sort(
              getOrderComparator(
                order,
                orderBy,
                headers.find((header) => header.id === orderBy).typeVar,
              ),
            )
            .map((row, i) => (
              <TableRow
                hover
                key={`${row.area}${i}`}
                selected={selectedAreas.has(String(row.area))}
                data-testid={`tablerow_${row.area}`}
                style={{
                  cursor: row.area != national ? "pointer" : "auto",
                }}
                onClick={() => toggleArea(String(row.area))}
              >
                {headers.map((cell, ind) => (
                  <TableCell
                    key={`${row.area}${i}${ind}`}
                    component={ind === 0 ? "th" : "td"}
                    scope="row"
                    padding="none"
                    align={cell.typeVar === "number" ? "right" : "left"}
                    sx={{
                      paddingTop: "0.125rem",
                      fontFamily:
                        cell.typeVar === "number" ? "Monospace" : "default",
                      fontWeight: row.area === national ? "bolder" : "normal",
                    }}
                  >
                    {cell.format
                      ? customFormat(cell.format, lang)(Number(row[cell.id]))
                      : row[cell.id] === national
                        ? nationalLabel[lang]
                        : row[cell.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { getOrderComparator } from "../../helpers/functions/dataTransformation";
import { nationalLabelList } from "../../app_config";
import {
  customFormat,
  customFormatEng,
} from "../../helpers/functions/localFormater";
import { useRouter } from "next/router";

type DataTableProps<Data, Headers extends string & Partial<keyof Data>> = {
  caption: string;
  data: Data[];
  headers: {
    id: string & Partial<Headers>;
    label_no: string;
    label_en: string;
    typeVar: Data[Headers];
    format?: string;
  }[];
  lang: "en" | "nb" | "nn";
};

export const DataTable = <
  Data extends { [n: string]: string | number },
  TableHeaders extends string & Partial<keyof Data>
>({
  caption,
  data,
  headers,
  lang,
}: DataTableProps<Data, TableHeaders>) => {
  // Pick out bohf query from the url
  const router = useRouter();
  const selected_bohf = [router.query.bohf].flat();

  const [order, setOrder] = React.useState<"asc" | "desc">("desc");
  const [orderBy, setOrderBy] = React.useState(headers[1].id);
  const createSortHandler = (property) => (event) => {
    (() => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    })();
  };
  return (
    <TableContainer>
      <Table>
        <caption>{caption}</caption>
        <TableHead>
          <TableRow>
            {headers.map((header, i) => (
              <TableCell
                key={`${header.id}${i}`}
                align={header.typeVar === "number" ? "right" : "left"}
                padding={"none"}
                sortDirection={orderBy === header.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === header.id}
                  direction={orderBy === header.id ? order : "asc"}
                  onClick={createSortHandler(header.id)}
                  sx={{ fontWeight: 600 }}
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
                headers.filter((header) => header.id === orderBy)[0].typeVar
              )
            )
            .map((row, i) => (
              <TableRow
                hover
                key={`${row.bohf}${i}`}
                selected={selected_bohf.includes(String(row.bohf))}
                data-testid={`tablerow_${row.bohf}`}
                style={{
                  cursor: nationalLabelList.includes(String(row.bohf))
                    ? "auto"
                    : "pointer",
                }}
                onClick={() => {
                  // Add HF to query param if clicked on.
                  // Remove HF from query param if it already is selected.
                  // Only possible to click on HF, and not on national value
                  !nationalLabelList.includes(String(row.bohf))
                    ? router.replace(
                        {
                          query: {
                            ...router.query,
                            bohf:
                              selected_bohf[0] === undefined
                                ? row.bohf
                                : selected_bohf.includes(String(row.bohf))
                                ? selected_bohf.filter((d) => d != row.bohf)
                                : selected_bohf.concat(String(row.bohf)),
                          },
                        },
                        undefined,
                        { shallow: true }
                      )
                    : undefined;
                }}
              >
                {headers.map((cell, ind) => (
                  <TableCell
                    key={`${row.bohf}${i}${ind}`}
                    component={ind === 0 ? "th" : "td"}
                    scope="row"
                    sx={{ paddingTop: "2px" }}
                    padding="none"
                    align={cell.typeVar === "number" ? "right" : "left"}
                    style={{
                      fontWeight: nationalLabelList.includes(String(row.bohf))
                        ? "bolder"
                        : "normal",
                    }}
                  >
                    {cell.format
                      ? lang === "en"
                        ? customFormatEng(cell.format)(Number(row[cell.id]))
                        : customFormat(cell.format)(Number(row[cell.id]))
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

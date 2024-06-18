import Link from "next/link";
import style from "./tableblocktitle.module.css";
import { Button } from "@mui/material";
import { RegisterName } from "types";

interface BlockTitleProps {
  tabName: string;
  link?: string;
  title: string;
  colspan: number;
  tr_register_name_class: string;
  registryButton?: boolean;
  registerName: RegisterName;
}

export const TableBlockTitle = (props: BlockTitleProps) => {
  const {
    tabName,
    link = "",
    title = "Nasjonalt hoftebruddregister",
    colspan = 2,
    tr_register_name_class = "register-row",
    registryButton,
    registerName,
  } = props;

  const registryLink = (
    <Link href={`/${link}/${tabName}`} passHref>
      <h3 className={style.title}>{title}</h3>
    </Link>
  );

  const registryButtonRow = [
    title,
    <Button
      variant="outlined"
      sx={{ marginLeft: "20px" }}
      onClick={() => {
        if (registerName.url) {
          window.open(registerName.url, "_blank");
        }
      }}
    >
      Mer om registeret
    </Button>,
  ];

  return (
    <tr className={`${style.titleRow} ${tr_register_name_class}`}>
      <td colSpan={colspan}>
        {registryButton ? registryButtonRow : registryLink}
      </td>
    </tr>
  );
};

export default TableBlockTitle;

import Link from "next/link";
import style from "./tableblocktitle.module.css";

interface BlockTitleProps {
  link?: string;
  title: string;
  colspan: number;
  tr_register_name_class: string;
}

export const TableBlockTitle = (props: BlockTitleProps) => {
  const {
    link = "",
    title = "Nasjonalt hoftebruddregister",
    colspan = 2,
    tr_register_name_class = "register-row",
  } = props;
  return (
    <tr className={`${style.titleRow} ${tr_register_name_class}`}>
      <td colSpan={colspan}>
        <Link href={`/${link}`} passHref>
          <h3 className={style.title}>{title}</h3>
        </Link>
      </td>
    </tr>
  );
};

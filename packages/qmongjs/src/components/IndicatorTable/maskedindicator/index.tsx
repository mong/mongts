import style from "./maskedindicator.module.css";

interface MaskedIndicatorProps {
  text: "Lav dg" | "Lav N" | "Ingen Data";
}

export const MaskedIndicator = ({ text }: MaskedIndicatorProps) => {
  return <div className={style.maskedIndicator}>{text}</div>;
};

import React from "react";
import { Markdown } from "../Markdown";

type TextBoxProps = {
  children: string;
  lang: "nb" | "en" | "nn";
};

export const TextBox: React.FC<TextBoxProps> = ({ children, lang }) => {
  return <Markdown lang={lang}>{children}</Markdown>;
};

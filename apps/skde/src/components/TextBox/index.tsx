import React from "react";
import { Markdown } from "../Markdown";

type TextBoxProps = {
  children: string;
  lang: "nb" | "en" | "nn";
};

export const TextBox = ({ children, lang }: TextBoxProps) => {
  return <Markdown lang={lang}>{children}</Markdown>;
};

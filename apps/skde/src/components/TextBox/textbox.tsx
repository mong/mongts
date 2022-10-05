import React from "react";
import { Markdown } from "../Markdown";

type TextBoxProps = {
  children: string;
};

export const TextBox: React.FC<TextBoxProps> = ({ children }) => {
  return <Markdown lang="no">{children}</Markdown>;
};

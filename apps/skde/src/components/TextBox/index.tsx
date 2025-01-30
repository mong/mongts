import React from "react";
import { Markdown } from "../Markdown";
import { Atlas } from "../../types";

type TextBoxProps = {
  atlas: Atlas;
  children: string;
};

export const TextBox = ({ atlas, children }: TextBoxProps) => {
  return <Markdown lang={atlas.lang}>{children}</Markdown>;
};

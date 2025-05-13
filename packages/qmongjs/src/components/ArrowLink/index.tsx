import { type JSX } from "react";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import { TypographyVariant } from "@mui/material";

type ArrowLinkProps = {
  href: string;
  text: string;
  externalLink?: boolean;
  button?: boolean;
  fontSize?: "small" | "medium" | "large" | "inherit";
  textVariant?: TypographyVariant;
  bold?: boolean;
};

/**
 * Renders a link with an arrow icon.
 *
 * @param {ArrowLinkProps} props - The properties for the ArrowLink component.
 * @param {string} props.href - The URL the link should navigate to.
 * @param {string} props.text - The text to display as the link content.
 * @param {boolean} [props.externalLink] - Whether it is an external or internal link. If externalLink is true, the link will open in a new tab and the arrow will be an arrow_outward.
 * @param {boolean} [props.button] - Whether to render the link as a button.
 * @param {boolean} [props.bold] - Whether to render the text as bold.
 * @return {JSX.Element} The rendered link with arrow icon.
 */
export const ArrowLink = (props: ArrowLinkProps) => {
  const {
    href,
    text,
    externalLink = false,
    button = false,
    fontSize = "inherit",
    textVariant,
    bold = false,
  } = props;

  let arrow: JSX.Element;
  let target: string;

  if (externalLink) {
    arrow = <ArrowOutwardIcon fontSize={fontSize} />;
    target = "_blank";
  } else {
    arrow = <ArrowForwardIcon fontSize={fontSize} />;
    target = "_self";
  }

  return button ? (
    <Button href={href} target={target} variant="text">
      <Stack alignItems="center" direction="row" gap={1}>
        <Typography variant={textVariant}>{text}</Typography>
        {arrow}
      </Stack>
    </Button>
  ) : (
    <Link href={href} target={target}>
      <Stack alignItems="center" direction="row" gap={1}>
        <Typography variant={textVariant}>
          {bold ? <b>{text}</b> : text}
        </Typography>
        {arrow}
      </Stack>
    </Link>
  );
};

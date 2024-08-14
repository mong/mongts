import Button from "@mui/material/Button";
import { ArrowForward, ArrowOutward } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";

type ArrowLinkProps = {
  href: string;
  text: string;
  externalLink?: boolean;
  button?: boolean;
  fontSize?: "small" | "inherit" | "large" | "medium";
  textVariant?: "subtitle1" | "subtitle2";
};

/**
 * Renders a link with an arrow icon.
 *
 * @param {ArrowLinkProps} props - The properties for the ArrowLink component.
 * @param {string} props.href - The URL the link should navigate to.
 * @param {string} props.text - The text to display as the link content.
 * @param {boolean} [props.externalLink] - Whether it is an external or internal link. If externalLink is true, the link will open in a new tab and the arrow will be an arrow_outward.
 * @param {boolean} [props.button] - Whether to render the link as a button.
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
  } = props;

  let arrow: JSX.Element;
  let target: string;

  if (externalLink) {
    arrow = <ArrowOutward fontSize={fontSize} />;
    target = "_blank";
  } else {
    arrow = <ArrowForward fontSize={fontSize} />;
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
        <Typography variant={textVariant}>{text}</Typography>
        {arrow}
      </Stack>
    </Link>
  );
};

import Button from "@mui/material/Button";
import { ArrowForward, ArrowOutward } from "@mui/icons-material";
import { Stack } from "@mui/material";
import Link from "next/link";

type ArrowLinkProps = {
  href: string;
  text: string;
  diagonalArrow?: boolean;
  button?: boolean;
  fontSize?: "small" | "inherit" | "large" | "medium";
};

/**
 * Renders a link with an arrow icon.
 *
 * @param {ArrowLinkProps} props - The properties for the ArrowLink component.
 * @param {string} props.href - The URL the link should navigate to.
 * @param {string} props.text - The text to display as the link content.
 * @param {boolean} [props.diagonalArrow] - Whether to use a diagonal arrow icon.
 * @param {boolean} [props.button] - Whether to render the link as a button.
 * @return {JSX.Element} The rendered link with arrow icon.
 */
export const ArrowLink = (props: ArrowLinkProps) => {
  const {
    href,
    text,
    diagonalArrow = false,
    button = false,
    fontSize = "inherit",
  } = props;

  let arrow: JSX.Element;

  diagonalArrow
    ? (arrow = <ArrowOutward fontSize={fontSize} />)
    : (arrow = <ArrowForward fontSize={fontSize} />);

  return button ? (
    <Button href={href} target="_blank" variant="text">
      <Stack alignItems="center" direction="row" gap={1}>
        {text}
        {arrow}
      </Stack>
    </Button>
  ) : (
    <Link href={href}>
      <Stack alignItems="center" direction="row" gap={1}>
        {text}
        {arrow}
      </Stack>
    </Link>
  );
};

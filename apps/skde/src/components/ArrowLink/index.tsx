import Button from "@mui/material/Button";
import { ArrowForward, ArrowOutward } from "@mui/icons-material";
import { Stack } from "@mui/material";

type ArrowLinkProps = {
  href: string;
  text: string;
  diagonalArrow?: boolean;
  button?: boolean;
};

export const ArrowLink = (props: ArrowLinkProps) => {
  const { href, text, diagonalArrow, button } = props;

  let arrow: JSX.Element;
  let align: string;

  diagonalArrow ? (arrow = <ArrowOutward />) : (arrow = <ArrowForward />);
  diagonalArrow ? (align = "normal") : (align = "center");

  return button ? (
    <Button href={href} target="_blank" variant="text">
      <Stack alignItems={align} direction="row" gap={1}>
        {text}
        {arrow}
      </Stack>
    </Button>
  ) : (
    <Stack alignItems={align} direction="row" gap={1}>
      {text}
      {arrow}
    </Stack>
  );
};

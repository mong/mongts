import Button from "@mui/material/Button";
import { ArrowForward, ArrowOutward } from "@mui/icons-material";

type ArrowLinkProps = {
  href: string;
  text: string;
  diagonalArrow?: boolean;
};

export const ArrowLink = (props: ArrowLinkProps) => {
  const { href, text, diagonalArrow } = props;

  let arrow: JSX.Element;

  diagonalArrow ? (arrow = <ArrowOutward />) : (arrow = <ArrowForward />);

  return (
    <Button href={href} target="_blank" variant="text">
      {[text, arrow]}
    </Button>
  );
};

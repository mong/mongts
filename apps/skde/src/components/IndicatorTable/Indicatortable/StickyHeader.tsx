import { AppBar, Toolbar } from "@mui/material";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";

type Props = {
  children?: React.ReactElement<unknown>;
};

const HideOnScroll = (props: Props) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    target: undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
};

type AppBarProps = {
  children?: React.ReactElement<unknown>;
};

export const TreatmentQualityAppBarV2 = ({ children }: AppBarProps) => {
  return (
    <HideOnScroll {...children}>
      <AppBar position="sticky" color="secondary">
        <Toolbar>{children}</Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

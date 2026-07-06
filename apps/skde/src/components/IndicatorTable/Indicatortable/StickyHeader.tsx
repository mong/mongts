import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Fade from "@mui/material/Fade";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import * as React from "react";

interface ScrollTopProps {
  children?: React.ReactElement<unknown>;
}

function ScrollTop(props: ScrollTopProps) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: "2rem", right: "6rem", zIndex: "2" }}
      >
        {children}
      </Box>
    </Fade>
  );
}

type AppBarProps = {
  children?: React.ReactElement<unknown>;
};

export const TreatmentQualityAppBarV2 = ({ children }: AppBarProps) => {
  return (
    <React.Fragment>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        id="back-to-top-anchor"
      >
        <Toolbar disableGutters={true}>{children}</Toolbar>
      </AppBar>
      <ScrollTop>
        <Fab size="large" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
};

import { LayoutHead } from "./LayoutHead";
import { Header } from "./Header";
import { Footer } from "../Footer";
import { Box, styled } from "@mui/material";

interface Props {
  children: React.ReactNode;
  page?: string;
  lang: "no" | "en";
}

const PageWrapper = styled(Box)(({ theme }) => ({
  "& .footer": {
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.up("xl")]: {
      paddingLeft: theme.spacing(16),
      paddingRight: theme.spacing(16),
    },
  },
  backgroundColor: theme.palette.background.paper,
}));

export function AtlasLayout({ children, lang }: Props) {
  return (
    <>
      <PageWrapper>
        <LayoutHead />
        <Header lang={lang} />
        {children}
        <Footer page="helseatlas" />
      </PageWrapper>
    </>
  );
}

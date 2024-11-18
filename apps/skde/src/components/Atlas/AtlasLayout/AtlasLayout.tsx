import { LayoutHead } from "../../LayoutHead";
import { Header } from "./Header";
import { Footer } from "../../Footer";
import { PageWrapper } from "../../StyledComponents/PageWrapper";

interface Props {
  children: React.ReactNode;
  page?: string;
  lang: "no" | "en";
}

export function AtlasLayout({ children, lang }: Props) {
  return (
    <PageWrapper>
      <LayoutHead
        title="Helseatlas"
        content="The healthcare atlases on Helseatlas.no are a tool for comparing the population's use of health services in different geographical areas, regardless of where the patients actually receive treatment."
        href="/helseatlas/img/logos/favicon.ico"
      />
      <Header lang={lang} />
      {children}
      <Footer page="helseatlas" maxWidth={"xxl"} />
    </PageWrapper>
  );
}

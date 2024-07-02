import { LayoutHead } from "./LayoutHead";
import { Header } from "./Header";
import { Footer } from "../Footer";
import { PageWrapper } from "../StyledComponents/PageWrapper";

interface Props {
  children: React.ReactNode;
  page?: string;
  lang: "no" | "en";
}

export function AtlasLayout({ children, lang }: Props) {
  return (
    <PageWrapper>
      <LayoutHead />
      <Header lang={lang} />
      {children}
      <Footer page="helseatlas" />
    </PageWrapper>
  );
}

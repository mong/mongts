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
<<<<<<< HEAD
    <PageWrapper>
      <LayoutHead />
      <div style={{ background: "blue" }}>Efef</div>
      <Header lang={lang} />
      <div style={{ background: "blue" }}>Efef</div>
      {children}
      <div style={{ background: "wheat" }}>Efef</div>
      <Footer page="helseatlas" />
      <div style={{ background: "wheat" }}>Efef</div>
    </PageWrapper>
=======
    <>
      <PageWrapper>
        <LayoutHead />
        <div style={{ background: "blue" }}>Efef</div>
        <Header lang={lang} />
        <div style={{ background: "blue" }}>Efef</div>
        {children}
        <div style={{ background: "wheat" }}>Efef</div>
        <Footer page="helseatlas" />
        <div style={{ background: "wheat" }}>Efef</div>
      </PageWrapper>
    </>
>>>>>>> d6cc55e4 (Lagrer endringer)
  );
}

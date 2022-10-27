import { useEffect, useState } from "react";
import { LayoutHead } from "./LayoutHead";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface Props {
  children: any;
}

export const Layout = ({ children }: Props) => {
  const [origin, setOrigin] = useState("");
  useEffect(() => {
    setOrigin(window.location.origin);
  }, [setOrigin]);

  return (
    <div>
      <LayoutHead />
      <Header />
      {children}
      <Footer />
    </div>
  );
};

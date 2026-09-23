import type { Metadata } from "next";
import Stadiumfigur from "@/components/Stadiumfigur";

export const metadata: Metadata = {
  title: "Stadievurdering",
  description: "...",
};

const Page = () => {
  return <Stadiumfigur />;
};

export default Page;

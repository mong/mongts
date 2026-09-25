import type { Metadata } from "next";
import { Suspense } from "react";
import LoadingFallback from "@/components/LoadingFallback";
import Stadiumfigur from "@/components/Stadiumfigur";

export const metadata: Metadata = {
  title: "Stadievurdering",
  description: "...",
};

const Page = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Stadiumfigur />
    </Suspense>
  );
};

export default Page;

import Image from "next/image";
import { imgLoader } from "./";

const defaultSize = 40;

export const newestLevelSymbols = (
  level: string | undefined,
  key?: string,
  size?: number,
) => {
  return level === "H" ? (
    <Image
      loader={imgLoader}
      src={"/img/icons/Icon_high_green.svg"}
      width={size || defaultSize}
      height={size || defaultSize}
      key={key}
      alt={"Høy måloppnåelse"}
    />
  ) : level === "M" ? (
    <Image
      loader={imgLoader}
      src={"/img/icons/Icon_medium_yellow.svg"}
      width={size || defaultSize}
      height={size || defaultSize}
      key={key}
      alt={"Middels måloppnåelse"}
    />
  ) : level === "L" ? (
    <Image
      loader={imgLoader}
      src={"/img/icons/Icon_low_red.svg"}
      width={size || defaultSize}
      height={size || defaultSize}
      key={key}
      alt={"Lav måloppnåelse"}
    />
  ) : null;
};

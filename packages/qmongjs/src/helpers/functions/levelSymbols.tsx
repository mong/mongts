import Image from "next/image";
import { FaCircle, FaSquare } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { imgLoader } from "./imgLoader";

export const newLevelSymbols = (level: string | undefined, key?: string) => {
  return level === "H" ? (
    <FaCircle style={{ color: "#58A55C", fontSize: "1.2rem" }} key={key} />
  ) : level === "M" ? (
    <FaSquare style={{ color: "#FD9C00", fontSize: "1.2rem" }} key={key} />
  ) : level === "L" ? (
    <IoTriangle style={{ color: "#D85140", fontSize: "1.2rem" }} key={key} />
  ) : null;
};

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

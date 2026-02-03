import { FaCircle, FaAdjust, FaRegCircle, FaSquare } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { imgLoader } from "./imgLoader";
import Image from "next/image";

export const levelSymbols = (level: string | undefined, key?: string) => {
  return level === "H" ? (
    <FaCircle style={{ color: "#3baa34", fontSize: "1.2rem" }} key={key} />
  ) : level === "M" ? (
    <FaAdjust style={{ color: "#fd9c00", fontSize: "1.2rem" }} key={key} />
  ) : level === "L" ? (
    <FaRegCircle style={{ color: "#e30713", fontSize: "1.2rem" }} key={key} />
  ) : (
    <></>
  );
};

export const newLevelSymbols = (level: string | undefined, key?: string) => {
  return level === "H" ? (
    <FaCircle style={{ color: "#58A55C", fontSize: "1.2rem" }} key={key} />
  ) : level === "M" ? (
    <FaSquare style={{ color: "#FD9C00", fontSize: "1.2rem" }} key={key} />
  ) : level === "L" ? (
    <IoTriangle style={{ color: "#D85140", fontSize: "1.2rem" }} key={key} />
  ) : (
    <></>
  );
};

const size = 40;

export const newestLevelSymbols = (level: string | undefined, key?: string) => {
  return level === "H" ? (
    <Image
      loader={imgLoader}
      src={"/img/icons/Icon high green.svg"}
      width={size}
      height={size}
      key={key}
      alt={"Høy måloppnåelse"}
    />
  ) : level === "M" ? (
    <Image
      loader={imgLoader}
      src={"/img/icons/Icon medium yellow.svg"}
      width={size}
      height={size}
      key={key}
      alt={"Middels måloppnåelse"}
    />
  ) : level === "L" ? (
    <Image
      loader={imgLoader}
      src={"/img/icons/Icon low red.svg"}
      width={size}
      height={size}
      key={key}
      alt={"Lav måloppnåelse"}
    />
  ) : (
    <></>
  );
};

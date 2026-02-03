import { FaCircle, FaAdjust, FaRegCircle } from "react-icons/fa";
import Image from "next/image";
import { imgLoader } from "qmongjs";

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

const size = 40;

export const newLevelSymbols = (level: string | undefined, key?: string) => {
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

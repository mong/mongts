import { FaCircle, FaAdjust, FaRegCircle, FaSquare } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";

export const levelSymbols = (level: string | undefined) => {
  return level === "H" ? (
    <FaCircle style={{ color: "#3baa34", fontSize: "1.2rem" }} />
  ) : level === "M" ? (
    <FaAdjust style={{ color: "#fd9c00", fontSize: "1.2rem" }} />
  ) : level === "L" ? (
    <FaRegCircle style={{ color: "#e30713", fontSize: "1.2rem" }} />
  ) : (
    <></>
  );
};

export const newLevelSymbols = (level: string | undefined) => {
  return level === "H" ? (
    <FaCircle style={{ color: "#58A55C", fontSize: "1.2rem" }} />
  ) : level === "M" ? (
    <FaSquare style={{ color: "#FD9C00", fontSize: "1.2rem" }} />
  ) : level === "L" ? (
    <IoTriangle style={{ color: "#D85140", fontSize: "1.2rem" }} />
  ) : (
    <></>
  );
};

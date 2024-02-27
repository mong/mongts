import { FaCircle, FaAdjust, FaRegCircle } from "react-icons/fa";

export const levelSymbols = (level: string) => {
  return(
    level === "H" ? (
      <FaCircle style={{ color: "#3baa34", fontSize: "1.2rem" }} />
    ) : level === "M" ? (
      <FaAdjust style={{ color: "#fd9c00", fontSize: "1.2rem" }} />
    ) : level === "L" ? (
      <FaRegCircle style={{ color: "#e30713", fontSize: "1.2rem" }} />
    ) : <></>
  )
  
}


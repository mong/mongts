import { FaCircle, FaAdjust, FaRegCircle } from "react-icons/fa";
import CircleIcon from "@mui/icons-material/Circle";
import SquareIcon from "@mui/icons-material/Square";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";

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
    <CircleIcon
      style={{ outline: "#36883B", color: "#58A55C", fontSize: "1.2rem" }}
    />
  ) : level === "M" ? (
    <SquareIcon
      style={{ outline: "#DA8700", color: "#FD9C00", fontSize: "1.2rem" }}
    />
  ) : level === "L" ? (
    <ChangeHistoryIcon
      style={{ outline: "#C43E2D", color: "#D85140", fontSize: "1.2rem" }}
    />
  ) : (
    <></>
  );
};

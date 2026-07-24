import {
  levelGreenColours,
  levelRedColours,
  levelYellowColours,
} from "../../../app_config";
import type { DisplayLevel } from "./types";

export const DISPLAY_LEVELS: DisplayLevel[] = ["high", "medium", "low"];

export const LEVEL_LABELS: Record<DisplayLevel, string> = {
  high: "Høy",
  medium: "Middels",
  low: "Lav",
};

export const LEVEL_COLORS: Record<DisplayLevel, string> = {
  high: levelGreenColours[1],
  medium: levelYellowColours[1],
  low: levelRedColours[1],
};

export const LEVEL_ICONS: Record<DisplayLevel, string> = {
  high: "target_level_high",
  medium: "target_level_medium",
  low: "target_level_low",
};

export const MAX_BAR_WIDTH_PX = 128;

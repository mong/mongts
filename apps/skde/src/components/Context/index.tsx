import React from "react";
import { MapData } from "../../types";

export const DataContext: React.Context<{ atlasData: any; mapData: MapData }> =
  React.createContext({ atlasData: {}, mapData: undefined });

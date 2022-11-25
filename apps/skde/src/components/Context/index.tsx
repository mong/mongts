import React from "react";
import { MapData, DataProps } from "../../types";

export const DataContext: React.Context<{
  atlasData: DataProps;
  mapData: MapData;
}> = React.createContext({
  atlasData: { innhold: undefined },
  mapData: undefined,
});

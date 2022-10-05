import React from "react";

export const DataContext: React.Context<{ atlasData: any; mapData: any }> =
  React.createContext({ atlasData: {}, mapData: {} });

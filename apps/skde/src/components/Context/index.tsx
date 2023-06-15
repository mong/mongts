import React from "react";

export const DataContext: React.Context<{ atlasData: any }> =
  React.createContext({ atlasData: {} });

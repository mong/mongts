import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DataContext: React.Context<{ atlasData: any }> =
  React.createContext({ atlasData: {} });

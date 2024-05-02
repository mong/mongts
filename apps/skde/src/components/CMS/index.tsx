import { useEffect } from "react";
import React from "react";
import { config } from "./config";

const Admin = () => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    import("decap-cms-app").then(async (cms: any) => {
      cms.init({ config });
    });
  }, []);
  return <></>;
};

export default Admin;

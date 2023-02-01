import { useEffect } from "react";
import React from "react";
import { config } from "./config";

const Admin = () => {
  useEffect(() => {
    import("@staticcms/core").then(async (cms: any) => {
      cms.init({ config });
    });
  }, []);
  return <></>;
};

export default Admin;

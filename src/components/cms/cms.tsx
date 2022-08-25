import { useEffect } from "react";
import React from "react";
import { config } from "./config";

const Admin = () => {
  console.log("netlify-cms-app version 2.14.48");

  useEffect(() => {
    import("netlify-cms-app").then(async (cms: any) => {
      cms.init({ config });
    });
  }, []);
  return <></>;
};

export default Admin;

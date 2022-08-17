import { useEffect } from "react";
import CMS from "netlify-cms-app";
import React from "react";
import { config } from "./config";

const Admin = () => {
  useEffect(() => {
    CMS.init({ config });
  }, []);
  return <></>;
};

export default Admin;

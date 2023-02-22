import CMS from "@staticcms/core";
import { useEffect } from "react";
import { config } from "./config";

const Admin = () => {
  useEffect(() => {
    CMS.init({ config });
  }, []);
  return <></>;
};

export default Admin;

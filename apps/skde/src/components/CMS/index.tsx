import CMS from "@staticcms/core";
import { useEffect } from "react";

import { config } from "./config";

const Admin = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      config.local_backend = true;
    }
    CMS.init({ config });
  }, []);

  return <></>;
};

export default Admin;

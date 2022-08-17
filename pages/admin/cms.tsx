import { useEffect } from "react";
import CMS from "netlify-cms-app";
import React from "react";
import { config } from "./config";

const Preview = (props) => {
  const entry = props.entry;
  const title = entry.getIn(["data", "title"]) || "";

  return (
    <>
      <h1>{props.widgetFor("title")}</h1>
      {props.widgetFor("body")}
    </>
  );
};

const Admin = () => {
  useEffect(() => {
    CMS.init({ config });
    CMS.registerPreviewTemplate("blog", Preview);
  }, []);

  return <></>;
};

export default Admin;

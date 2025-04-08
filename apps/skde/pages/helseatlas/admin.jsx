"use client";

import React from "react";
import Script from "next/script";
import { config } from "../../src/helpers/config/CMS-config";

/* global window */
export function CMS() {
  React.useEffect(() => {
    window.CMS_MANUAL_INIT = true;
  }, []);

  return (
    <>
      <Script
        src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"
        onLoad={() => {
          window.initCMS({ config });
        }}
      />
    </>
  );
}

export default CMS;

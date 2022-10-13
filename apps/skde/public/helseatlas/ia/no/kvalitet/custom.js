/** Copyright (C) 2012 Geowise Ltd All Rights Reserved. The following is Source Code and is subject to all restrictions on such code as contained in the End User License Agreement accompanying this product. */

// For code examples visit
// http://www.instantatlas.com/customers/support/library/desktop/tech-articles/html/custom-javascript

/**
 * This function initialises the report.
 */
iaInitReport = function () {
  // Initialise IA Report.
  ia.init({
    container: "ia-report-container",
    onSuccess: iaOnReportComplete,
    onFail: iaOnReportFail,
    data: {
      config: { source: "./config.xml" },
      attribute: { source: "./data.js" },
      map: { source: "./map.js" },
    },
  });
};

/**
 * This function is called after the report has finished loading.
 * The report object is the entry point to the JavaScript API.
 *
 * @param report The InstantAtlas Report object.
 */
iaOnReportComplete = function (report) {};

/**
 * This function is called if the report fails to load a file.
 */
iaOnReportFail = function (url, XMLHttpRequest, textStatus, errorThrown) {
  ia.log(url);
  ia.log(XMLHttpRequest.status);
  ia.log(textStatus);
  ia.log(errorThrown);

  if (XMLHttpRequest.status == "404") {
    // File not found.
    if (errorThrown == "Not Found") alert("File not found: " + url);
    else
      alert(
        BrowserDetect.browser +
          " does not currently display InstantAtlas HTML5 reports from local or networked drives."
      );
  }
};

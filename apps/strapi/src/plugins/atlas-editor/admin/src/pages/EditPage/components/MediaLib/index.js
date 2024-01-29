"use strict";

import React from "react";
import { prefixFileUrlWithBackendUrl, useLibrary } from "@strapi/helper-plugin";
import PropTypes from "prop-types";

const MediaLib = ({ isOpen, onChange, onToggle }) => {
  const { components } = useLibrary();
  const MediaLibraryDialog = components["media-library"];

  const handleSelectAssets = (files) => {
    const formattedFiles = files.map((f) => ({
      alt: f.alternativeText || f.name,
      url: prefixFileUrlWithBackendUrl(f.url),
      mime: f.mime,
      id: f.id,
    }));
    onChange(formattedFiles);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <MediaLibraryDialog
      onSelectAssets={handleSelectAssets}
      allowedTypes={["images"]}
      onClose={onToggle}
    />
  );
};

export default MediaLib;

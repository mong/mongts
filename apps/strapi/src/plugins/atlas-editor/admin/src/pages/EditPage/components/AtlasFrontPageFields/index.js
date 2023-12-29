import React, { useContext } from "react";
import { Typography } from "@strapi/design-system";
import EditPageStringsContext from "../../EditPageStringsContext";

const AtlasFrontPageFields = () => {
  const strings = useContext(EditPageStringsContext);

  return (
    <Typography variant="delta" as="h2">
      {strings.frontPageFields}
    </Typography>
  );
};

export default AtlasFrontPageFields;

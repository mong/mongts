import React, { useState } from "react";
import { useParams } from "react-router-dom";
import pluginId from "../../pluginId";

const EditPage = () => {
  let { id } = useParams();

  return <div>Editing ID: {id}</div>;
};

export default EditPage;

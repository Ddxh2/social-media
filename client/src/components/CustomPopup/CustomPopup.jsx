import React from "react";
import { Popup } from "semantic-ui-react";

const CustomPopup = ({ content, children }) => {
  return <Popup content={content} inverted trigger={children} />;
};

export default CustomPopup;

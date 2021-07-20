import React from "react";
import "./main-container.css";

export const MainContainer = ({ children, className }) => {
  return <div className={`wrapper main ${className}`}>{children}</div>;
};

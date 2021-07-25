import React from "react";
import { Logo } from "../components";
import "./common.css";
export const Loading = ({ show }) => {
  return (
    <div
      className="wrapper fix_wrapper center"
      style={{ position: "absolute", minWidth: "100vw" }}
    >
      <Logo className="loading" />
    </div>
  );
};

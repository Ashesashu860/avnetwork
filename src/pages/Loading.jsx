import React from "react";
// import { Logo } from "../components";
import "./common.css";
import Logo from "../assets/logo.svg";
import { LoaderIcon } from "../components";

export const Loading = ({ show }) => {
  return (
    <div
      className="fix_wrapper center"
      style={{
        position: "absolute",
        minWidth: "100vw",
        minHeight: "100vh",
        top: 0,
        backgroundColor: "#eee",
        zIndex: "4000",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img src={Logo} alt="Logo" style={{ maxHeight: "8rem" }} />
      <LoaderIcon />
    </div>
  );
};

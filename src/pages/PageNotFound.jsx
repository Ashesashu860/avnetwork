import React from "react";
import PageNotFoundSVG from "../assets/page_not_found.svg";
import { ContentContainer } from "../components";

export const PageNotFound = () => {
  return (
    <div
      className="wrapper fix_wrapper center"
      style={{ flexDirection: "column" }}
    >
      <img
        src={PageNotFoundSVG}
        alt="page not found"
        style={{ maxWidth: "80vmin" }}
      />
      <ContentContainer heading={"Page Not Found"} />
    </div>
  );
};

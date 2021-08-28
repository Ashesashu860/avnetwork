import React from "react";
import UnderConst from "../assets/under_const.svg";
import { ContentContainer } from "../components";

export const UnderConstruction = () => {
  return (
    <div
      className="wrapper fix_wrapper center"
      style={{ flexDirection: "column" }}
    >
      <img
        src={UnderConst}
        alt="under construction"
        style={{ maxWidth: "80vmin" }}
      />
      <ContentContainer heading={"Under Construction"} />
    </div>
  );
};

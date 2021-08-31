import React, { useEffect } from "react";
import { ViewUserTemplate } from "../Profile";

export const ViewUser = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="wrapper">
      <ViewUserTemplate user={props.location.state} />
    </div>
  );
};

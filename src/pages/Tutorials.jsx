import { Grid } from "@material-ui/core";
import React from "react";
import { ContentContainer } from "../components";

export const Tutorials = () => {
  React.useEffect(() => window.scrollTo(0, 0));
  return (
    <div className="wrapper">
      <ContentContainer
        subHeading={"Learn From Experts"}
        style={{ alignItems: "center" }}
      />
      <Grid container style={{ padding: "0 2rem" }} spacing={2}>
        <Grid item>
          <iframe
            style={{
              outline: "none",
              border: "0px",
              borderRadius: "4px",
            }}
            allowFullScreen="allowFullScreen"
            title="https://youtube.com/embed/KHH0_YVUxfE?controls=1"
            src="https://youtube.com/embed/KHH0_YVUxfE?controls=1"
          ></iframe>
        </Grid>
        <Grid item>
          <iframe
            style={{ outline: "none", border: "0px", borderRadius: "4px" }}
            allowFullScreen="allowFullScreen"
            title="https://youtube.com/embed/FvyX1GIE8GM?controls=1"
            src="https://youtube.com/embed/FvyX1GIE8GM?controls=1"
          ></iframe>
        </Grid>
      </Grid>
    </div>
  );
};

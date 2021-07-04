import React from "react";
import { Fab, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { mockBlogs } from "../../mocks";
import { BlogCard } from "../Blog";

export const Blog = () => {
  React.useEffect(() => window.scrollTo(0, 0));
  return (
    <div className="wrapper" style={{ height: "auto" }}>
      <Grid
        container
        direction="row"
        spacing={2}
        alignItems="center"
        justify="center"
      >
        {mockBlogs.map((blog) => {
          console.log("Blog", blog);
          return (
            <Grid item>
              <BlogCard {...blog} />
            </Grid>
          );
        })}
      </Grid>
      <Fab
        variant="extended"
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "2rem",
          color: "#fff",
          backgroundColor: "var(--primary)",
          fontSize: "0.8rem",
        }}
      >
        <AddIcon />
        Add Blog
      </Fab>
    </div>
  );
};

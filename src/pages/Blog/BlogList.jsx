import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { BlogCard } from ".";
import { StyledFab, StyledNavLink } from "../../components";

export const BlogList = ({
  fabRef,
  noFab,
  style,
  blogs,
  className,
  direction,
  location,
}) => {
  React.useEffect(() => window.scrollTo(0, 0), []);
  return (
    <div
      className={`wrapper ${direction === "row" && "blog_row"} ${className}`}
      style={{
        overflow: "auto",
        ...style,
      }}
    >
      <div
        className="center"
        style={{
          flexWrap: direction === "row" ? "nowrap" : "wrap",
        }}
      >
        {(blogs || location.blogs).map((blog, index) => {
          return <BlogCard {...blog} title={`${blog.title} ${index}`} />;
        })}
      </div>
      {/* <Grid
        container
        direction="row"
        spacing={2}
        alignItems="center"
        justify="center"
        style={{
          padding: "1rem 2rem",
          ...(direction === "row" && {
            overflow: "auto",
          }),
        }}
        wrap={direction === "row" ? "nowrap" : "wrap"}
      >
        {blogs.map((blog, index) => {
          return (
            <Grid item>
              <BlogCard {...blog} title={`${blog.title} ${index}`} />
            </Grid>
          );
        })}
      </Grid> */}
      <StyledNavLink to="/blog-create">
        <StyledFab
          variant="extended"
          ref={fabRef}
          primary
          style={{
            position: "fixed",
            bottom: "1rem",
            right: "2rem",
            display: noFab ? "none" : "inline-flex",
          }}
        >
          <AddIcon />
          Add Blog
        </StyledFab>
      </StyledNavLink>
    </div>
  );
};

import React, { useContext } from "react";
import AddIcon from "@material-ui/icons/Add";
import { BlogCard } from ".";
import { StyledFab, StyledNavLink, AuthContext } from "../../components";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const BlogListContainer = styled.div`
  overflow: auto;
  ${(props) =>
    (props.autoHeight || props.direction === "row") &&
    "min-height: auto !important;"}
  padding: 1rem;
`;

export const BlogList = ({
  fabRef,
  noFab,
  style,
  blogs,
  className,
  direction,
  location,
  autoHeight,
}) => {
  const { user } = useContext(AuthContext);
  React.useEffect(() => window.scrollTo(0, 0), []);

  const history = useHistory();

  return (
    <BlogListContainer
      autoHeight={autoHeight}
      direction={direction}
      className={`wrapper ${className}`}
      style={style}
    >
      <div
        className="center"
        style={{
          display: "inline-flex",
          flexWrap: direction === "row" ? "nowrap" : "wrap",
        }}
      >
        {(blogs || location.blogs).map((blog, index) => {
          const blogDate =
            blog.timestamp.getDate() +
            "/" +
            (blog.timestamp.getMonth() + 1) +
            "/" +
            blog.timestamp.getFullYear();
          return (
            <BlogCard
              key={index}
              blogDate={blogDate}
              {...blog}
              title={`${blog.title} ${index}`}
              onClick={(event) => {
                history.push(`/blogs/${index}`, blog);
              }}
            />
          );
        })}
      </div>
      {user && (
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
      )}
    </BlogListContainer>
  );
};

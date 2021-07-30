import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { BlogCard } from ".";
import { StyledFab, StyledNavLink } from "../../components";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getBlogsAction } from "../../redux/actions";

const BlogListContainer = styled.div`
  overflow: auto;
  ${(props) =>
    (props.autoHeight || props.direction === "row") &&
    "min-height: auto !important;"}
  padding: 1rem;
`;

const mapState = (state) => ({
  blogs: state.blogs,
  user: state.user,
});

export const BlogList = ({
  fabRef,
  noFab,
  style,
  className,
  direction,
  autoHeight,
}) => {
  const { blogs, user } = useSelector(mapState);
  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getBlogsAction());
  }, []);

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
        {!blogs ? (
          <h4>No Blogs</h4>
        ) : (
          blogs.map((blog, index) => {
            const blogTimestamp = new Date(blog.timestamp);
            const blogDate =
              blogTimestamp.getDate() +
              "/" +
              (blogTimestamp.getMonth() + 1) +
              "/" +
              blogTimestamp.getFullYear();
            return (
              <BlogCard
                key={index}
                blogDate={blogDate}
                {...blog}
                content={blog.content.replace(/<[^>]+>/g, " ")}
                onClick={(event) => {
                  history.push({
                    pathname: `/blogs/${blog.id}`,
                    state: {
                      id: blog.id,
                    },
                  });
                }}
              />
            );
          })
        )}
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

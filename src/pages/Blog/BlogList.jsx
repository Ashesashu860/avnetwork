import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { BlogCard } from ".";
import { StyledFab, StyledNavLink, ShadowContainer } from "../../components";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getBlogsAction } from "../../redux/actions";
import { Chip } from "@material-ui/core";
import { categories, getFormattedDate } from "./BlogCreateModules";

const BlogListContainer = styled.div`
  ${(props) =>
    (props.autoHeight || props.direction === "row") &&
    "min-height: auto !important;"}
`;

const mapState = (state) => ({
  allBlogs: state.blogs.allBlogs,
  currentUser: state.users.currentUser,
});

export const BlogList = ({
  fabRef,
  noFab,
  style,
  className,
  direction,
  autoHeight,
}) => {
  const { allBlogs, currentUser } = useSelector(mapState);
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const filteredBlogs = !selectedCategory
    ? allBlogs
    : allBlogs?.filter((blog) => blog?.category === selectedCategory);
  const sortedBlogs = filteredBlogs?.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const onCategoryClick = (index) => {
    setSelectedCategory(categories[index]);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getBlogsAction());
    const abortController = new AbortController();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <BlogListContainer
      autoHeight={autoHeight}
      direction={direction}
      className={`wrapper ${className}`}
      style={style}
    >
      <div style={{ paddingTop: "1rem" }}>
        <ShadowContainer>
          {categories.map((category, index) => (
            <Chip
              key={category}
              style={
                category === selectedCategory
                  ? { backgroundColor: "var(--primary)", color: "#fff" }
                  : {
                      backgroundColor: "var(--primaryLight)",
                    }
              }
              clickable
              onClick={() => onCategoryClick(index)}
              label={category}
            />
          ))}
        </ShadowContainer>
        <ShadowContainer>
          <div
            className="center"
            style={{
              display: "inline-flex",
              flexWrap: direction === "row" ? "nowrap" : "wrap",
            }}
          >
            {!sortedBlogs?.length ? (
              <h4 style={{ padding: "1rem" }}>No Blogs</h4>
            ) : (
              sortedBlogs?.map((blog, index) => {
                return (
                  <BlogCard
                    key={index}
                    blogDate={getFormattedDate(blog.timestamp)}
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
        </ShadowContainer>
        {currentUser?.canWriteBlogs && (
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
      </div>
    </BlogListContainer>
  );
};

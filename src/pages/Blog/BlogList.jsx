import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { BlogCard } from ".";
import { StyledFab, StyledNavLink } from "../../components";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getBlogsAction } from "../../redux/actions";
import { Grid, Chip } from "@material-ui/core";
import { categories, getFormattedDate } from "./BlogCreateModules";

const BlogListContainer = styled.div`
  ${(props) =>
    (props.autoHeight || props.direction === "row") &&
    "min-height: auto !important;"}
  padding: 1rem;
`;

const CategoriesContainer = styled.div`
  position: relative;
  &::before {
    position: absolute;
    content: "";
    left: -2px;
    width: 1.5rem;
    z-index: 1;
    background-image: linear-gradient(to right, var(--background), transparent);
    height: 100%;
  }
  &::after {
    position: absolute;
    content: "";
    width: 1.5rem;
    right: -2px;
    background-image: linear-gradient(to left, var(--background), transparent);
    height: 100%;
  }
`;

const CategoriesSubContainer = styled(Grid)`
  overflow: auto;
  padding: 0 1rem;
  & > *:not(:last-child) {
    margin-right: 0.5rem;
  }
  &::-webkit-scrollbar {
    display: none;
  }
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
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const filteredBlogs = !selectedCategory
    ? blogs
    : blogs?.filter((blog) => blog?.category === selectedCategory);

  const onCategoryClick = (index) => {
    setSelectedCategory(categories[index]);
  };

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
      <div style={{ paddingTop: "1rem" }}>
        <CategoriesContainer className="center">
          <CategoriesSubContainer container wrap="nowrap">
            {categories.map((category, index) => (
              <Chip
                key={category}
                style={
                  category === selectedCategory
                    ? { backgroundColor: "var(--primary)", color: "#fff" }
                    : { backgroundColor: "var(--primaryLight)" }
                }
                clickable
                onClick={() => onCategoryClick(index)}
                label={category}
              />
            ))}
          </CategoriesSubContainer>
        </CategoriesContainer>
        <div style={{ overflow: "auto" }}>
          <div
            className="center"
            style={{
              display: "inline-flex",
              flexWrap: direction === "row" ? "nowrap" : "wrap",
            }}
          >
            {!filteredBlogs?.length ? (
              <h4 style={{ padding: "1rem" }}>No Blogs</h4>
            ) : (
              filteredBlogs?.map((blog, index) => {
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
      </div>
    </BlogListContainer>
  );
};

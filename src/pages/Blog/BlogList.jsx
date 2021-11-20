import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { BlogCard } from ".";
import {
  StyledFab,
  StyledNavLink,
  ShadowContainer,
  FilterChips,
} from "../../components";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getBlogsAction } from "../../redux/actions";
import { getFormattedDate } from "./BlogCreateModules";
import { blogCategories } from "../masterData";

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
  latest,
}) => {
  const { allBlogs, currentUser } = useSelector(mapState);
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const filteredBlogs =
    !selectedCategory || selectedCategory === "All"
      ? allBlogs
      : allBlogs?.filter((blog) => blog?.category === selectedCategory);
  const sortedBlogs = filteredBlogs?.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const latestBlogs = latest ? sortedBlogs?.slice(-3) : sortedBlogs;

  const filteredCategories = [...blogCategories];
  filteredCategories.unshift("All");

  const onCategoryClick = (index) => {
    setSelectedCategory(filteredCategories[index]);
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
        <FilterChips
          options={filteredCategories}
          selectedOption={selectedCategory}
          onOptionChange={onCategoryClick}
        />
        <ShadowContainer>
          <div
            className="center"
            style={{
              display: "inline-flex",
              flexWrap: direction === "row" ? "nowrap" : "wrap",
              justifyContent: latest ? "space-evenly" : "initial",
              width: "100%",
            }}
          >
            {!latestBlogs?.length ? (
              <h4 style={{ padding: "1rem" }}>No Blogs</h4>
            ) : (
              latestBlogs?.map((blog, index) => {
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

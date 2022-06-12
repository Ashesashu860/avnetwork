import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { BlogCard } from ".";
import {
  StyledFab,
  StyledNavLink,
  FilterChips,
  LoaderIcon,
} from "../../components";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getBlogsAction } from "../../redux/actions";
import { getFormattedDate } from "./BlogCreateModules";
import { blogCategories } from "../masterData";
import { Grid } from "@material-ui/core";

export const BlogListContainer = styled.div`
  min-height: auto;
`;

export const RowContainer = styled.div`
  scroll-snap-type: x mandatory;
  height: auto;
  width: auto;
  overflow: hidden;
`;

export const RowSubContainer = styled(Grid)`
  scroll-snap-align: start;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const mapState = (state) => ({
  allBlogs: state.blogs.allBlogs,
  currentUser: state.users.currentUser,
  areBlogsLoading: state.blogs.areBlogsLoading,
});

export const BlogList = ({
  fabRef,
  noFab,
  style,
  className,
  direction,
  latest,
}) => {
  const { allBlogs, currentUser, areBlogsLoading } = useSelector(mapState);
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

  const renderedBlogs = latestBlogs?.map((blog, index) => {
    return (
      <BlogCard
        key={index}
        style={{ float: "left" }}
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
  });

  return (
    <BlogListContainer
      direction={direction}
      className={`wrapper ${className}`}
      style={style}
    >
      {areBlogsLoading ? (
        <Grid container alignItems="center" justifyContent="center">
          <LoaderIcon />
        </Grid>
      ) : (
        <>
          {direction !== "row" && (
            <FilterChips
              options={filteredCategories}
              selectedOption={selectedCategory}
              onOptionChange={onCategoryClick}
            />
          )}
          <Grid container alignItems="center" justifyContent="center">
            {direction === "row" ? (
              <RowContainer>
                <RowSubContainer container wrap="nowrap">
                  {renderedBlogs}
                </RowSubContainer>
              </RowContainer>
            ) : (
              renderedBlogs
            )}
          </Grid>
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
        </>
      )}
    </BlogListContainer>
  );
};

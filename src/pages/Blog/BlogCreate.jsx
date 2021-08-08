import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "quill-mention";
import "quill-mention/dist/quill.mention.css";
import { StyledFab, StyledInput } from "../../components";
import { Grid, Select, FormControl, InputLabel } from "@material-ui/core";
import BlogCreateModel from "../../models/BlogCreate";
import { withRouter } from "react-router-dom";
import { modules, formats, categories } from "./BlogCreateModules";
import { useDispatch, useSelector } from "react-redux";
import { addBlogInDbAction, setAlertAction } from "../../redux/actions";
import "react-quill/dist/quill.snow.css";

const mapState = (state) => ({
  user: state.user,
});

export const BlogCreate = withRouter(({ history }) => {
  const currentBlog = history.location.state?.currentBlog;
  const dispatch = useDispatch();
  const { user } = useSelector(mapState);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [blog, setBlog] = useState({
    title: currentBlog?.title || "",
    category: currentBlog?.category || "",
  });
  const [blogContent, setBlogContent] = useState(currentBlog?.content || "");

  const onChange = (event) => {
    if (event.target) {
      setBlog({
        ...blog,
        [event?.target?.name]: event?.target?.value,
      });
    }
  };

  const onBlogContentChange = (value) => {
    setBlogContent(value);
  };

  const onPublishClick = (event) => {
    if (!blog.title) {
      dispatch(setAlertAction("Please give a suitable title"));
      return;
    }
    if (!blogContent) {
      dispatch(setAlertAction("Unable to publish empty blog"));
      return;
    }
    if (!blog.category) {
      dispatch(setAlertAction("Please choose a valid category"));
      return;
    }
    const newBlog = new BlogCreateModel(
      currentBlog?.id,
      user.uid,
      user.displayName,
      blog.title,
      blogContent,
      blog.category,
      currentBlog?.likes || 0,
      currentBlog?.comments || 0,
      currentBlog?.ratings || 0
    );
    dispatch(addBlogInDbAction(newBlog, history));
  };
  return (
    <div className="wrapper" style={{ padding: "1.5rem" }}>
      <StyledInput
        type="text"
        value={blog.title}
        name="title"
        onChange={onChange}
        style={{
          margin: 0,
          height: "3.5rem",
          border: "1px solid #ccc",
          padding: "0 1.2rem",
          textAlign: "center",
        }}
        placeholder="Enter the title..."
      />
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder="Enter your thoughts..."
        name="content"
        onChange={onBlogContentChange}
        value={blogContent}
      />
      <Grid container justify="flex-end">
        <FormControl style={{ minWidth: "8rem", margin: "1rem" }}>
          <InputLabel>Category</InputLabel>
          <Select
            native
            defaultValue=""
            name="category"
            value={blog.category}
            onChange={onChange}
            label="Category"
          >
            <option value={""}></option>
            {categories.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </Select>
        </FormControl>
        <StyledFab
          style={{ margin: "1rem" }}
          variant="extended"
          bold
          primary
          onClick={onPublishClick}
        >
          {history.location.state?.currentBlog ? "Update" : "Publish"}
        </StyledFab>
      </Grid>
    </div>
  );
});

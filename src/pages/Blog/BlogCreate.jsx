import React, { useState, useEffect, useContext, useRef } from "react";
import ReactQuill from "react-quill";
import "quill-mention";
import "quill-mention/dist/quill.mention.css";
import { StyledFab, AuthContext, DialogBox, Alert } from "../../components";
import { Grid, Select, FormControl, InputLabel } from "@material-ui/core";
import firebase from "../../config/firebase-config";
import BlogCreateModel from "../../models/BlogCreate";
import { withRouter } from "react-router-dom";
import { modules, formats } from "./BlogCreateModules";

const atValues = [
  { id: 1, value: "Fredrik Sundqvist" },
  { id: 2, value: "Patrik Sjölin" },
];

export const BlogCreate = withRouter((props) => {
  const { user } = useContext(AuthContext);
  let editorRef = useRef();

  const categories = ["AV Cables", "Speakers", "Displays", "Lighting"];

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("editor ref", editorRef.current.state.value);
  }, []);

  const [category, setCategory] = useState("");
  const [dialogBoxProps, setDialogBoxProps] = useState(null);
  const [alertProps, setAlertProps] = useState({
    title: "",
    severity: "error",
    onClose: () => null,
  });
  const onCategoryChange = (event) => setCategory(event.target.value);

  const handleDialogClose = () => {
    setDialogBoxProps({
      ...dialogBoxProps,
      open: false,
    });
  };

  const onAlertClose = () => {
    setAlertProps({
      ...alertProps,
      title: "",
    });
  };

  const onPublishClick = (event) => {
    console.log("data", editorRef.current.state.value);
    if (!editorRef.current.state.value) {
      setAlertProps({
        ...alertProps,
        open: true,
        title: "Unable to publish empty blog",
        onClose: onAlertClose,
      });
      return;
    }
    if (!category) {
      setAlertProps({
        ...alertProps,
        open: true,
        title: "Please choose a valid category",
        onClose: onAlertClose,
      });
      return;
    }
    setDialogBoxProps({
      handleClose: handleDialogClose,
      open: true,
      title: "Publishing Your Blog...",
    });
    const blog = new BlogCreateModel(
      user.uid,
      user.displayName,
      editorRef.current.state.value,
      category
    );
    firebase
      .database()
      .ref(`blogs/${blog.id}`)
      .set({ ...blog, timestamp: firebase.database.ServerValue.TIMESTAMP })
      .then((res) =>
        setDialogBoxProps({
          open: true,
          title: "Blog Published",
          hideLoader: true,
          buttonProps: {
            title: "OK",
            onButtonClick: (event) => {
              props.history.push("/blogs");
            },
          },
        })
      );
  };

  return (
    <div className="wrapper" style={{ padding: "1.5rem" }}>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder="Enter your thoughts..."
        inputProps
        ref={editorRef}
      >
        <div className="my-editing-area" />
      </ReactQuill>
      <Grid container justify="flex-end">
        <FormControl style={{ minWidth: "8rem", margin: "1rem" }}>
          <InputLabel>Category</InputLabel>
          <Select
            native
            defaultValue=""
            value={category}
            onChange={onCategoryChange}
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
          Publish
        </StyledFab>
        <DialogBox {...dialogBoxProps} />
        <Alert {...alertProps} />
      </Grid>
    </div>
  );
});

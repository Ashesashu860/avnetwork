import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "quill-mention";
import "quill-mention/dist/quill.mention.css";
import { StyledFab } from "../../components";
import { Grid, Select, FormControl, InputLabel } from "@material-ui/core";
import firebase from "../../config/firebase-config";
import BlogCreateModel from "../../models/BlogCreate";

const atValues = [
  { id: 1, value: "Fredrik Sundqvist" },
  { id: 2, value: "Patrik Sjölin" },
];

export const BlogCreate = () => {
  const modules = React.useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image", "video"],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
      ],
      mention: {
        allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
        mentionDenotationChars: ["@", "#"],
        source: function (searchTerm, renderItem, mentionChar) {
          let values;
          if (mentionChar === "@" || mentionChar === "#") {
            values = atValues;
          }
          if (searchTerm.length === 0) {
            renderItem(values, searchTerm);
          } else {
            const matches = [];
            for (let i = 0; i < values.length; i++)
              if (
                ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
              )
                matches.push(values[i]);
            renderItem(matches, searchTerm);
          }
        },
      },
    }),
    []
  );

  const formats = React.useMemo(
    () => [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "link",
      "image",
      "video",
      "mention",
      "align",
    ],
    []
  );

  let data = null;

  const handleChange = (content, delta, source, editor) => {
    //let has_attribues = delta.ops[1].attributes || "";
    //console.log(has_attribues);
    //const cursorPosition = e.quill.getSelection().index;
    // this.quill.insertText(cursorPosition, "★");
    //this.quill.setSelection(cursorPosition + 1);
    data = content;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onPublishClick = (event) => {
    //const firebase_db = firebase.database().ref();
    //DELETE
    // firebase.database().ref("test2/-MfRynEJ5zcTE-5WrLBG").remove();
    //GET
    // firebase
    //     .database()
    //     .ref()
    //     .child("test")
    //     .on("value", (snap) => console.log(snap.val()))
    //GET BY ID
    // firebase
    //     .database()
    //     .ref("test2/-MfRynEJ5zcTE-5WrLBG")
    //     .on("value", (snap) => console.log(snap.val()))
    //UPDATE
    // firebase.database().ref("test2/-MfRynEJ5zcTE-5WrLBG").update({
    //   blogContent: "ashes updated",
    // });
    //ADD
    // firebase.database().ref("test2/id").push().set({ id: id, test: "testid1" });
    // console.log("test", firebase.database().ref("test2").push());
    //firebase.database().ref("test2/id").push().set(new BlogCreateModel());
    // firebase.database().ref("users");
    // .on("value", (snap) => console.log("firebase data", snap.val()));
  };

  const [category, setCategory] = useState("");

  const onCategoryChange = (event) => setCategory(event.target.value);

  const categories = ["AV Cables", "Speakers", "Displays", "Lighting"];

  return (
    <div className="wrapper" style={{ padding: "1.5rem" }}>
      <ReactQuill
        theme="snow"
        modules={modules}
        onChange={handleChange}
        formats={formats}
        placeholder="Enter your thoughts..."
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
      </Grid>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "quill-mention";
import "quill-mention/dist/quill.mention.css";
import { StyledFab } from "../../components";
import { Grid } from "@material-ui/core";
import firebase from "../../config/firebase-config";

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
    const firebase_db = firebase.database().ref();
    firebase_db.on("value", (snap) => console.log("snap", snap.val()));
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

    // firebase.database().ref("test2").push().set({ test: "testid1" });

    console.log("test", firebase.database().ref("test2").push());
  };

  return (
    <div className="wrapper" style={{ padding: "1.5rem" }}>
      <input
        type="text"
        placeholder="Enter Title..."
        style={{
          backgroundColor: "transparent",
          width: "100%",
          border: "1px solid #ccc",
          padding: "1rem",
          textAlign: "center",
        }}
      />
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

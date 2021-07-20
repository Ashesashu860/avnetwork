//https://codepen.io/FLCcrakers/pen/JZVeZE?editors=0111

//https://codepen.io/tinymce/pen/QjzgRW

import React, { Component } from "react";
import ReactQuill from "react-quill";
import "quill-mention";
import "quill-mention/dist/quill.mention.css";
const atValues = [
  { id: 1, value: "Fredrik Sundqvist" },
  { id: 2, value: "Patrik Sjölin" },
];

const toolbarOptions = ["bold"];

export class BlogCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "<div contenteditable='false'>Hector oscar Pacheco</div>",
    };
  }

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
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
  };

  formats = [
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
    "mention",
  ];
  handleProcedureContentChange = (content, delta, source, editor) => {
    //let has_attribues = delta.ops[1].attributes || "";
    //console.log(has_attribues);
    //const cursorPosition = e.quill.getSelection().index;
    // this.quill.insertText(cursorPosition, "★");
    //this.quill.setSelection(cursorPosition + 1);
  };
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="wrapper">
        <ReactQuill
          theme="snow"
          modules={this.modules}
          formats={this.formats}
          value={this.state.text}
          onChange={this.handleProcedureContentChange}
        >
          <div className="my-editing-area" />
        </ReactQuill>
      </div>
    );
  }
}

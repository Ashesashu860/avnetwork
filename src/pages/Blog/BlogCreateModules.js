export const modules = {
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
      // if (mentionChar === "@" || mentionChar === "#") {
      //   values = atValues;
      // }
      if (searchTerm.length === 0) {
        renderItem(values, searchTerm);
      } else {
        const matches = [];
        for (let i = 0; i < values.length; i++)
          if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
            matches.push(values[i]);
        renderItem(matches, searchTerm);
      }
    },
  },
};

export const formats = [
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
];

export const categories = [
  "AV Cables",
  "Speakers",
  "Displays",
  "Lighting",
  "Trussing Systems",
];

export const getFormattedDate = (timestamp) => {
  const dateTime = new Date(timestamp);
  return `${dateTime.getDate()}/${
    dateTime.getMonth() + 1
  }/${dateTime.getFullYear()}`;
};

export const atValues = [
  { id: 1, value: "Name1" },
  { id: 2, value: "Name2" },
];

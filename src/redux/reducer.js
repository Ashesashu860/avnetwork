const initialState = {
  user: null,
  blogs: null,
  currentBlog: null,
  isLoading: false,
  dialogBoxProps: {
    title: "",
    buttonProps: null,
  },
  alertProps: {
    severity: "error",
    title: "",
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
      };
    case "SET_LOADER":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_DIALOG_BOX":
      return {
        ...state,
        dialogBoxProps: action.payload,
      };
    case "SET_ALERT":
      return {
        ...state,
        alertProps: action.payload,
      };
    //BLOGS
    case "GET_BLOGS_SUCCESS":
      return {
        ...state,
        blogs: action.payload.blogs,
      };
    case "GET_BLOG_WITH_ID_SUCCESS":
      return {
        ...state,
        currentBlog: action.payload.blog,
      };
    default:
      return state;
  }
};

export default rootReducer;

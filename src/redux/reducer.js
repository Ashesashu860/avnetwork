const initialState = {
  user: null,
  blogs: null,
  currentBlog: null,
  isCurrentBlogLiked: false,
  currentBlogComments: null,
  isCurrentBlogLikeLoading: false,
  isCurrentBlogCommentsLoading: false,
  isLoading: false,
  users: null,
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
    case "SET_ALL_USERS":
      return {
        ...state,
        users: action.payload.users,
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
    case "SET_CURRENT_BLOG":
      return {
        ...state,
        currentBlog: action.payload.blog,
      };
    case "SET_LIKE":
      return {
        ...state,
        isCurrentBlogLiked: action.payload.isLiked,
      };
    case "SET_CURRENT_BLOG_COMMENTS":
      return {
        ...state,
        currentBlogComments: action.payload.currentBlogComments,
      };
    case "TOGGLE_LIKE_LOADING":
      return {
        ...state,
        isCurrentBlogLikeLoading: action.payload.shouldLoad,
      };
    case "TOGGLE_COMMENTS_LOADING":
      return {
        ...state,
        isCurrentBlogCommentsLoading: action.payload.shouldLoad,
      };

    default:
      return state;
  }
};

export default rootReducer;

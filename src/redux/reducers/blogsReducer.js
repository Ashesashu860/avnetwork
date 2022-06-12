const initialState = {
  allBlogs: null,
  currentBlog: null,
  isCurrentBlogLiked: false,
  currentBlogComments: null,
  isCurrentBlogLikeLoading: false,
  isCurrentBlogCommentsLoading: false,
  areBlogsLoading: false,
};

export const blogsReducer = (blogsState = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_BLOGS_LOADING":
      return {
        ...blogsState,
        areBlogsLoading: action.payload.areBlogsLoading,
      };
    case "GET_BLOGS_SUCCESS":
      return {
        ...blogsState,
        areBlogsLoading: false,
        allBlogs: action.payload.blogs,
      };
    case "SET_CURRENT_BLOG":
      return {
        ...blogsState,
        currentBlog: action.payload.blog,
      };
    case "SET_LIKE":
      return {
        ...blogsState,
        isCurrentBlogLiked: action.payload.isLiked,
      };
    case "SET_CURRENT_BLOG_COMMENTS":
      return {
        ...blogsState,
        currentBlogComments: action.payload.currentBlogComments,
      };
    case "TOGGLE_LIKE_LOADING":
      return {
        ...blogsState,
        isCurrentBlogLikeLoading: action.payload.shouldLoad,
      };
    case "TOGGLE_COMMENTS_LOADING":
      return {
        ...blogsState,
        isCurrentBlogCommentsLoading: action.payload.shouldLoad,
      };
    default:
      return blogsState;
  }
};

export const getBlogsAction = () => ({
  type: "GET_BLOGS",
});

export const getBlogsSuccessAction = (blogs) => ({
  type: "GET_BLOGS_SUCCESS",
  payload: {
    blogs,
  },
});

export const getBlogWithIdAction = (blogId) => ({
  type: "GET_BLOG_WITH_ID",
  payload: {
    blogId,
  },
});

export const setCurrentBlogAction = (blog) => ({
  type: "SET_CURRENT_BLOG",
  payload: {
    blog,
  },
});

export const addBlogInDbAction = (blog, history) => ({
  type: "ADD_BLOG",
  payload: {
    blog,
    history,
  },
});

export const addCommentInBlogAction = (blogId, user, comment, history) => ({
  type: "ADD_COMMENT_IN_BLOG",
  payload: {
    blogId,
    user,
    comment,
    history,
  },
});

export const getCurrentBlogLikeAction = (blogId, userId) => ({
  type: "GET_CURRENT_BLOG_LIKE",
  payload: {
    blogId,
    userId,
  },
});

//to SET LIKE IN DB
export const toggleCurrentBlogLikeAction = (blogId, userId) => ({
  type: "TOGGLE_CURRENT_BLOG_LIKE",
  payload: {
    blogId,
    userId,
  },
});

//to set like in state
export const setCurrentBlogLikeAction = (isLiked) => ({
  type: "SET_LIKE",
  payload: {
    isLiked,
  },
});

//to set like loading
export const toggleLikeLoadingAction = (shouldLoad) => ({
  type: "TOGGLE_LIKE_LOADING",
  payload: {
    shouldLoad,
  },
});

//to get comments from DB
export const getCurrentBlogCommentsAction = (blogId) => ({
  type: "GET_CURRENT_BLOG_COMMENTS",
  payload: {
    blogId,
  },
});

//to set comments in state
export const setCurrentBlogCommentsAction = (currentBlogComments) => ({
  type: "SET_CURRENT_BLOG_COMMENTS",
  payload: {
    currentBlogComments,
  },
});

export const toggleCommentsLoadingAction = (shouldLoad) => ({
  type: "TOGGLE_COMMENTS_LOADING",
  payload: {
    shouldLoad,
  },
});

export const deleteBlogAction = (blogId, history) => ({
  type: "DELETE_BLOG",
  payload: {
    blogId,
    history,
  },
});

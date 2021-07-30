export const getBlogsAction = () => ({
  type: "GET_BLOGS",
});

export const getBlogsSuccessAction = (blogs) => ({
  type: "GET_BLOGS_SUCCESS",
  payload: {
    blogs,
  },
});

export const getBlogWithIdAction = (id) => ({
  type: "GET_BLOG_WITH_ID",
  payload: {
    id,
  },
});

export const getBlogWithIdSuccessAction = (blog) => ({
  type: "GET_BLOG_WITH_ID_SUCCESS",
  payload: {
    blog,
  },
});

export const addBlogAction = (blog, history) => ({
  type: "ADD_BLOG",
  payload: {
    blog,
    history,
  },
});

export const addCommentInBlogAction = (id, comment, history) => ({
  type: "ADD_COMMENT_IN_BLOG",
  payload: {
    id,
    comment,
    history,
  },
});

export const deleteBlogAction = (id, history) => ({
  type: "DELETE_BLOG",
  payload: {
    id,
    history,
  },
});

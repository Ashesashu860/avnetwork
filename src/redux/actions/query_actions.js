export const postQueryAction = (query, user) => ({
  type: "POST_QUERY",
  payload: {
    query,
    user,
  },
});

export const getAllQueriesForCurrentUserAction = (userId) => ({
  type: "GET_ALL_QUERIES",
  payload: {
    userId,
  },
});

export const setAllQueriesForCurrentUserAction = (allQueries) => ({
  type: "SET_ALL_QUERIES",
  payload: {
    allQueries,
  },
});

export const toggleQueriesLoadingAction = (areQueriesLoading) => ({
  type: "TOGGLE_QUERIES_LOADING",
  payload: {
    areQueriesLoading,
  },
});

//Comments
export const postAQueryCommentAction = (queryId, queryComment, user) => ({
  type: "POST_QUERY_COMMENT",
  payload: {
    queryId,
    queryComment,
    user,
  },
});

export const getQueryCommentsAction = (queryId) => ({
  type: "GET_QUERY_COMMENTS",
  payload: {
    queryId,
  },
});

export const setQueryCommentsAction = (queryId, queryComments) => ({
  type: "SET_QUERY_COMMENTS",
  payload: {
    queryId,
    queryComments,
  },
});

export const toggleQueryCommentsLoadingAction = (areQueryCommentsLoading) => ({
  type: "TOGGLE_QUERY_COMMENTS_LOADING",
  payload: {
    areQueryCommentsLoading,
  },
});

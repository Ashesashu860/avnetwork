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

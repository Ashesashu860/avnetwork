const initialState = {
  allQueries: null,
  areQueriesLoading: false,
  queryComments: null,
  areQueryCommentsLoading: false,
};

export const queriesReducer = (queriesState = initialState, action) => {
  switch (action.type) {
    case "SET_ALL_QUERIES":
      return {
        ...queriesState,
        allQueries: action.payload.allQueries,
      };
    case "TOGGLE_QUERIES_LOADING":
      return {
        ...queriesState,
        areQueriesLoading: action.payload.areQueriesLoading,
      };
    case "SET_QUERY_COMMENTS":
      return {
        ...queriesState,
        queryComments: {
          ...queriesState.queryComments,
          [action.payload.queryId]: action.payload.queryComments,
        },
      };
    case "TOGGLE_QUERY_COMMENTS_LOADING":
      return {
        ...queriesState,
        areQueryCommentsLoading: action.payload.areQueryCommentsLoading,
      };
    default:
      return queriesState;
  }
};

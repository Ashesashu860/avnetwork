const initialState = {
  allQueries: null,
  areQueriesLoading: false,
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
    default:
      return queriesState;
  }
};

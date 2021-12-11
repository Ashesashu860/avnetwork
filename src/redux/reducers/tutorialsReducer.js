const initialState = {
  allTutorials: null,
};

export const tutorialsReducer = (tutorialsState = initialState, action) => {
  switch (action.type) {
    case "SET_ALL_TUTORIALS":
      return {
        ...tutorialsState,
        allTutorials: action.payload.allTutorials,
      };
    default:
      return tutorialsState;
  }
};

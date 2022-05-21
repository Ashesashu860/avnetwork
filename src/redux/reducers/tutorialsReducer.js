const initialState = {
  allTutorials: null,
  isCurrentTutorialLiked: false,
};

export const tutorialsReducer = (tutorialsState = initialState, action) => {
  switch (action.type) {
    case "SET_ALL_TUTORIALS":
      return {
        ...tutorialsState,
        allTutorials: action.payload.allTutorials,
      };
    case "LIKE_TUTORIAL_SUCCESS":
      return {
        ...tutorialsState,
        isCurrentTutorialLiked: action.payload.isLiked,
      };
    default:
      return tutorialsState;
  }
};

export const uploadTutorialAction = (tutorial, history) => ({
  type: "UPLOAD_TUTORIAL",
  payload: {
    tutorial,
    history,
  },
});

export const getAllTutorialsAction = () => ({
  type: "GET_ALL_TUTORIALS",
});

export const setAllTutorialsAction = (allTutorials) => ({
  type: "SET_ALL_TUTORIALS",
  payload: {
    allTutorials,
  },
});

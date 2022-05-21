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

export const likeTutorialAction = (tutorialId, userId) => ({
  type: "LIKE_TUTORIAL",
  payload: { tutorialId, userId },
});

export const likeTutorialSuccessAction = (isLiked) => ({
  type: "LIKE_TUTORIAL_SUCCESS",
  payload: { isLiked },
});

export const commentOnTutorialAction = (tutorialId, user, comment) => ({
  type: "COMMENT_ON_TUTORIAL",
  payload: {
    tutorialId,
    user,
    comment,
  },
});

export const commentOnTutorialSuccessAction = (comments) => ({
  type: "COMMENT_ON_TUTORIAL_SUCCESS",
  payload: {
    comments,
  },
});

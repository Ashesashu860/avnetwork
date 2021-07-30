export const setUserAction = (user) => ({
  type: "SET_USER",
  payload: {
    user,
  },
});

export const checkUserAuth = (history) => ({
  type: "CHECK_USER_AUTH",
  payload: {
    history,
  },
});

export const setUserInDbAction = (user, history) => ({
  type: "SET_USER_IN_DB",
  payload: {
    user,
    history,
  },
});

export const loginUserAction = (history) => ({
  type: "SIGN_IN_USER",
  payload: {
    history,
  },
});

export const logoutUserAction = (history) => ({
  type: "SIGN_OUT_USER",
  payload: {
    history,
  },
});

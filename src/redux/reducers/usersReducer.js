const initialState = {
  currentUser: null,
  allUsers: null,
};

export const usersReducer = (usersState = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...usersState,
        currentUser: action.payload.user,
      };
    case "SET_ALL_USERS":
      return {
        ...usersState,
        allUsers: action.payload.users,
      };
    default:
      return usersState;
  }
};

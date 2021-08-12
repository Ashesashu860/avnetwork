const initialState = {
  isLoading: false,
  dialogBoxProps: {
    title: "",
    buttonProps: null,
  },
  alertProps: {
    severity: "error",
    title: "",
  },
};

export const rootReducer = (rootState = initialState, action) => {
  switch (action.type) {
    case "SET_LOADER":
      return {
        ...rootState,
        isLoading: action.payload,
      };
    case "SET_DIALOG_BOX":
      return {
        ...rootState,
        dialogBoxProps: action.payload,
      };
    case "SET_ALERT":
      return {
        ...rootState,
        alertProps: action.payload,
      };
    default:
      return rootState;
  }
};

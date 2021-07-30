export const setLoaderAction = (loader) => ({
  type: "SET_LOADER",
  payload: loader,
});

export const setDialogBoxPropsAction = (
  title,
  buttonProps = null,
  hideLoader = false
) => ({
  type: "SET_DIALOG_BOX",
  payload: {
    title,
    buttonProps,
    hideLoader,
  },
});

export const setAlertAction = (title) => ({
  type: "SET_ALERT",
  payload: {
    title,
  },
});

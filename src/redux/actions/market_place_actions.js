export const addProductInDbAction = (product, userId, history) => ({
  type: "ADD_PRODUCT_IN_DB",
  payload: {
    product,
    userId,
    history,
  },
});

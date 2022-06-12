export const addProductInDbAction = (product, userId, history) => ({
  type: "ADD_PRODUCT_IN_DB",
  payload: {
    product,
    userId,
    history,
  },
});

export const getAllMarketPlaceProducts = () => ({
  type: "GET_ALL_MARKET_PLACE_PRODUCTS",
});

export const setAllMarketPlaceProducts = (allProducts) => ({
  type: "SET_ALL_MARKET_PLACE_PRODUCTS",
  payload: {
    allProducts,
  },
});

export const deleteMarketPlaceProductAction = (productId, history) => ({
  type: "DELETE_MARKET_PLACE_PRODUCT",
  payload: {
    productId,
    history,
  },
});

export const getCurrentMarketPlaceProductAction = (productId) => ({
  type: "GET_CURRENT_MARKET_PLACE_PRODUCT",
  payload: {
    productId,
  },
});

export const setCurrentMarketPlaceProductAction = (currentProduct) => ({
  type: "SET_CURRENT_MARKET_PLACE_PRODUCT",
  payload: {
    currentProduct,
  },
});

//INTEREST ACTIONS
export const setInterestForProductInDbAction = (
  productId,
  userId,
  interested
) => ({
  type: "SET_INTEREST_FOR_PRODUCT_IN_DB",
  payload: {
    productId,
    userId,
    interested,
  },
});

export const getAllInterestedUsersForProductAction = (productId) => ({
  type: "GET_ALL_INTERESTED_USERS_FOR_PRODUCT",
  payload: {
    productId,
  },
});

export const interestedUsersForProductLoadingAction = (shouldLoad) => ({
  type: "INTERESTED_USERS_FOR_PRODUCT_LOADING",
  payload: {
    shouldLoad,
  },
});

export const setAllInterestedUsersForProductInStateAction = (
  allInterestedUsers
) => ({
  type: "SET_ALL_INTERESTED_USERS_FOR_PRODUCT_IN_STATE",
  payload: {
    allInterestedUsers,
  },
});

export const getCurrentProductOwnerAction = (userId) => ({
  type: "GET_CURRENT_PRODUCT_OWNER",
  payload: {
    userId,
  },
});

export const setCurrentProductOwnerAction = (currentProductOwner) => ({
  type: "SET_CURRENT_PRODUCT_OWNER",
  payload: {
    currentProductOwner,
  },
});

export const toggleProductsLoadingAction = (areProductsLoading) => ({
  type: "TOGGLE_PRODUCTS_LOADING",
  payload: {
    areProductsLoading,
  },
});

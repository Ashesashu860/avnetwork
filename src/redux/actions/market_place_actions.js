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

// export const getCurrentProductInterestFromDbAction = (productId, userId) => ({
//   type: "GET_CURRENT_PRODUCT_INTEREST_FROM_DB",
//   payload: {
//     productId,
//     userId,
//   },
// });

// export const setCurrentProductInterestInStateAction = (interested) => ({
//   type: "SET_CURRENT_PRODUCT_INTEREST_IN_STATE",
//   payload: {
//     interested,
//   },
// });

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

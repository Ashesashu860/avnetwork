const initialState = {
  currentProduct: null,
  allProducts: null,
  allInterestedUsers: null,
  allInterestedUsersLoading: false,
};

export const marketPlaceReducer = (marketPlaceState = initialState, action) => {
  switch (action.type) {
    case "SET_ALL_MARKET_PLACE_PRODUCTS":
      return {
        ...marketPlaceState,
        allProducts: action.payload.allProducts,
      };
    case "SET_CURRENT_MARKET_PLACE_PRODUCT":
      return {
        ...marketPlaceState,
        currentProduct: action.payload.currentProduct,
      };
    // case "SET_CURRENT_PRODUCT_INTEREST_IN_STATE":
    //   return {
    //     ...marketPlaceState,
    //     currentProduct: {
    //       ...marketPlaceState.currentProduct,
    //       interested: action.payload.interested,
    //     },
    //   };
    case "INTERESTED_USERS_FOR_PRODUCT_LOADING":
      return {
        ...marketPlaceState,
        allInterestedUsersLoading: action.payload.shouldLoad,
      };
    case "SET_ALL_INTERESTED_USERS_FOR_PRODUCT_IN_STATE":
      return {
        ...marketPlaceState,
        allInterestedUsers: action.payload.allInterestedUsers,
      };
    default:
      return marketPlaceState;
  }
};

const initialState = {
  currentProduct: null,
  allProducts: null,
  allInterestedUsers: null,
  allInterestedUsersLoading: false,
  currentProductOwner: null,
  areProductsLoading: false,
};

export const marketPlaceReducer = (marketPlaceState = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_PRODUCTS_LOADING":
      return {
        ...marketPlaceState,
        areProductsLoading: action.payload.areProductsLoading,
      };
    case "SET_ALL_MARKET_PLACE_PRODUCTS":
      return {
        ...marketPlaceState,
        areProductsLoading: false,
        allProducts: action.payload.allProducts,
      };
    case "SET_CURRENT_MARKET_PLACE_PRODUCT":
      return {
        ...marketPlaceState,
        currentProduct: action.payload.currentProduct,
      };
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
    case "SET_CURRENT_PRODUCT_OWNER":
      return {
        ...marketPlaceState,
        currentProductOwner: action.payload.currentProductOwner,
      };
    default:
      return marketPlaceState;
  }
};

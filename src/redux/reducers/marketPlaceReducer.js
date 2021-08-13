const initialState = {
  isProductImageUploading: false,
  currentProduct: null,
};

export const marketPlaceReducer = (marketPlaceState = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_PRODUCT_IMAGE_UPLOAD_LOADING":
      return {
        ...marketPlaceState,
        isProductImageUploading: action.payload.shouldLoad,
      };
    case "SET_CURRENT_PRODUCT_IMAGES_IN_STATE":
      return {
        ...marketPlaceState,
        currentProduct: {
          ...marketPlaceState.currentProduct,
          images: action.payload.productImages,
        },
      };
    default:
      return marketPlaceState;
  }
};

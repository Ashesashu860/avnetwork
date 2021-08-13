export const toggleProductImageUploadLoading = (shouldLoad) => ({
  type: "TOGGLE_PRODUCT_IMAGE_UPLOAD_LOADING",
  payload: {
    shouldLoad,
  },
});

export const uploadProductImage = (productId, imageObject) => ({
  type: "UPLOAD_PRODUCT_IMAGE",
  payload: {
    productId,
    imageObject,
  },
});

// export const uploadProductImageSuccess = (imageURL) => ({
//   type: "UPLOAD_PRODUCT_IMAGE_SUCCESS",
//   payload: {
//     imageURL,
//   },
// });

export const getCurrentProductImages = (productId) => ({
  type: "GET_CURRENT_PRODUCT_IMAGES",
  payload: {
    productId,
  },
});

export const setCurrentProjectImagesInState = (productImages) => ({
  type: "SET_CURRENT_PRODUCT_IMAGES_IN_STATE",
  payload: {
    productImages,
  },
});

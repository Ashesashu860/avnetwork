import { takeLatest } from "@redux-saga/core/effects";
import {
  signInUser,
  signOutUser,
  setUserInDb,
  checkUserAuth,
  getAllUsersSaga,
  toggleBlogWritePermissionSaga,
} from "./user_sagas";
import {
  getBlogWithIdFromDb,
  getBlogsFromDb,
  addBlogInDb,
  deleteBlogFromDb,
  addCommentInBlogInDb,
  toggleCurrentBlogLikeInDb,
  getCurrentBlogLikeSaga,
  getCurrentBlogCommentsSaga,
} from "./blog_sagas";
import {
  addProductInDbSaga,
  getAllMarketPlaceProductsSaga,
  getCurrentMarketPlaceProductSaga,
  setInterestForProductInDbSaga,
  getAllInterestedUsersForProductSaga,
} from "./market_place_sagas";

export function* rootSaga() {
  //USER
  yield takeLatest("SIGN_IN_USER", signInUser);
  yield takeLatest("SIGN_OUT_USER", signOutUser);
  yield takeLatest("SET_USER_IN_DB", setUserInDb);
  yield takeLatest("GET_ALL_USERS", getAllUsersSaga);
  yield takeLatest(
    "TOGGLE_BLOG_WRITE_PERMISSION",
    toggleBlogWritePermissionSaga
  );
  //BLOG
  yield takeLatest("GET_BLOGS", getBlogsFromDb);
  yield takeLatest("GET_BLOG_WITH_ID", getBlogWithIdFromDb);
  yield takeLatest("ADD_BLOG", addBlogInDb);
  yield takeLatest("ADD_COMMENT_IN_BLOG", addCommentInBlogInDb);
  yield takeLatest("DELETE_BLOG", deleteBlogFromDb);
  yield takeLatest("CHECK_USER_AUTH", checkUserAuth);
  yield takeLatest("GET_CURRENT_BLOG_LIKE", getCurrentBlogLikeSaga);
  yield takeLatest("TOGGLE_CURRENT_BLOG_LIKE", toggleCurrentBlogLikeInDb);
  yield takeLatest("GET_CURRENT_BLOG_COMMENTS", getCurrentBlogCommentsSaga);
  //MARKET PLACE
  yield takeLatest("ADD_PRODUCT_IN_DB", addProductInDbSaga);
  yield takeLatest(
    "GET_ALL_MARKET_PLACE_PRODUCTS",
    getAllMarketPlaceProductsSaga
  );
  yield takeLatest(
    "GET_CURRENT_MARKET_PLACE_PRODUCT",
    getCurrentMarketPlaceProductSaga
  );
  yield takeLatest(
    "SET_INTEREST_FOR_PRODUCT_IN_DB",
    setInterestForProductInDbSaga
  );
  yield takeLatest(
    "GET_ALL_INTERESTED_USERS_FOR_PRODUCT",
    getAllInterestedUsersForProductSaga
  );
}

import { takeLatest } from "@redux-saga/core/effects";
import {
  signInUser,
  signOutUser,
  setUserInDb,
  checkUserAuth,
  getAllUsersSaga,
  toggleBlogWritePermissionSaga,
  updateUserSaga,
  deleteUserSaga,
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
  getCurrentProductOwnerSaga,
  deleteMarketPlaceProductSaga,
} from "./market_place_sagas";
import {
  uploadTutorialSaga,
  getAllTutorialsSaga,
  likeTutorialSaga,
  commentOnTutorialSaga,
} from "./tutorials_sagas";
import {
  getAllQueriesForCurrentUserSaga,
  getQueryCommentsSaga,
  postAQueryCommentSaga,
  postAQuerySaga,
} from "./query_sagas";

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
  yield takeLatest("UPDATE_USER", updateUserSaga);
  yield takeLatest("DELETE_USER", deleteUserSaga);
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
  yield takeLatest("GET_CURRENT_PRODUCT_OWNER", getCurrentProductOwnerSaga);
  yield takeLatest("DELETE_MARKET_PLACE_PRODUCT", deleteMarketPlaceProductSaga);
  //TUTORIALS
  yield takeLatest("UPLOAD_TUTORIAL", uploadTutorialSaga);
  yield takeLatest("GET_ALL_TUTORIALS", getAllTutorialsSaga);
  yield takeLatest("LIKE_TUTORIAL", likeTutorialSaga);
  yield takeLatest("COMMENT_ON_TUTORIAL", commentOnTutorialSaga);
  //QUERIES
  yield takeLatest("POST_QUERY", postAQuerySaga);
  yield takeLatest("GET_ALL_QUERIES", getAllQueriesForCurrentUserSaga);
  yield takeLatest("POST_QUERY_COMMENT", postAQueryCommentSaga);
  yield takeLatest("GET_QUERY_COMMENTS", getQueryCommentsSaga);
}

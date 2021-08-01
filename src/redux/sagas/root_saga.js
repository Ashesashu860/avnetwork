import { takeLatest } from "@redux-saga/core/effects";
import {
  signInUser,
  signOutUser,
  setUserInDb,
  checkUserAuth,
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

export function* rootSaga() {
  yield takeLatest("SIGN_IN_USER", signInUser);
  yield takeLatest("SIGN_OUT_USER", signOutUser);
  yield takeLatest("SET_USER_IN_DB", setUserInDb);
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
}

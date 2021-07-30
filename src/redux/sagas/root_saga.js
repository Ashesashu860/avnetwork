import { takeLatest } from "@redux-saga/core/effects";
import {
  signInUser,
  signOutUser,
  setUserInDb,
  checkUserAuth,
} from "./user_sagas";
import {
  getBlogFromDb,
  getBlogsFromDb,
  addBlogInDb,
  deleteBlogFromDb,
  addCommentInBlogInDb,
} from "./blog_sagas";

export function* rootSaga() {
  yield takeLatest("SIGN_IN_USER", signInUser);
  yield takeLatest("SIGN_OUT_USER", signOutUser);
  yield takeLatest("SET_USER_IN_DB", setUserInDb);
  //BLOG
  yield takeLatest("GET_BLOGS", getBlogsFromDb);
  yield takeLatest("GET_BLOG_WITH_ID", getBlogFromDb);
  yield takeLatest("ADD_BLOG", addBlogInDb);
  yield takeLatest("ADD_COMMENT_IN_BLOG", addCommentInBlogInDb);
  yield takeLatest("DELETE_BLOG", deleteBlogFromDb);
  yield takeLatest("CHECK_USER_AUTH", checkUserAuth);
}

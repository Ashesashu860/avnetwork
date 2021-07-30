import firebase from "../../config/firebase-config";
import { put } from "redux-saga/effects";
import {
  getBlogsSuccessAction,
  setDialogBoxPropsAction,
  getBlogWithIdSuccessAction,
} from "../actions";

export function* getBlogFromDb(action) {
  yield put(setDialogBoxPropsAction("Fetching Your Blog..."));
  const result = yield firebase
    .database()
    .ref(`blogs`)
    .child(action.payload.id)
    .get();
  const blog = yield result.val();
  yield put(setDialogBoxPropsAction(""));
  yield put(getBlogWithIdSuccessAction(blog));
}

export function* getBlogsFromDb() {
  yield put(setDialogBoxPropsAction("Fetching Blogs..."));
  const result = yield firebase.database().ref(`blogs`).get();
  const db_data = yield Object.values(result.val());
  yield put(setDialogBoxPropsAction(""));
  yield put(getBlogsSuccessAction(db_data));
}

export function* deleteBlogFromDb(action) {
  yield put(setDialogBoxPropsAction("Deleting Blog..."));
  yield firebase.database().ref(`blogs`).child(action.payload.id).remove();
  yield put(setDialogBoxPropsAction("Blog Deleted"));
}

export function* addCommentInBlogInDb(action) {
  yield put(setDialogBoxPropsAction("Posting Comment..."));
  yield firebase
    .database()
    .ref(`blogs`)
    .child(action.payload.id)
    .child("comments")
    .child(action.payload.comment.id)
    .set({
      ...action.payload.comment,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
  yield getBlogFromDb(action);
}

export function* addBlogInDb(action) {
  yield put(setDialogBoxPropsAction("Publishing your blog..."));
  yield firebase
    .database()
    .ref(`blogs/${action.payload.blog.id}`)
    .set({
      ...action.payload.blog,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
  yield put(
    setDialogBoxPropsAction(
      "Your blog is published",
      {
        title: "OK",
        onButtonClick: (event) => {
          action.payload.history.push("/blogs");
        },
      },
      true
    )
  );
}

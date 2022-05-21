import firebase from "../../config/firebase-config";
import { put } from "redux-saga/effects";
import {
  getBlogsSuccessAction,
  setDialogBoxPropsAction,
  setCurrentBlogAction,
  setAlertAction,
  toggleLikeLoadingAction,
  setCurrentBlogLikeAction,
  toggleCommentsLoadingAction,
  setCurrentBlogCommentsAction,
} from "../actions";
import { getDatafromDb } from "./saga_utilities";

//GET BLOG WITH ID IN DB
export function* getBlogWithIdFromDb(action) {
  try {
    yield put(setDialogBoxPropsAction("Fetching Your Blog..."));
    const blog = yield getDatafromDb(`blogs/${action.payload.blogId}`);
    yield put(setCurrentBlogAction(blog));
    yield put(setDialogBoxPropsAction(""));
  } catch (error) {
    yield put(setAlertAction(error));
  }
}

//GET ALL BLOGS FROM DB
export function* getBlogsFromDb() {
  try {
    yield put(setDialogBoxPropsAction("Fetching Blogs..."));
    const result = yield getDatafromDb("blogs");
    const db_data = yield Object.values(result);
    yield put(setDialogBoxPropsAction(""));
    yield put(getBlogsSuccessAction(db_data));
  } catch (error) {
    yield put(setAlertAction(error));
  }
}

//DELETE BLOG FROM DB
export function* deleteBlogFromDb(action) {
  try {
    yield put(setDialogBoxPropsAction("Deleting Blog..."));
    yield firebase
      .database()
      .ref(`blogs`)
      .child(action.payload.blogId)
      .remove();
    yield firebase
      .database()
      .ref(`blogLikes`)
      .child(action.payload.blogId)
      .remove();
    yield firebase
      .database()
      .ref(`blogComments`)
      .child(action.payload.blogId)
      .remove();
    yield put(
      setDialogBoxPropsAction(
        "Blog Deleted",
        {
          title: "OK",
          onButtonClick: (event) => {
            action.payload.history.push("/blogs");
          },
        },
        true
      )
    );
  } catch (error) {
    yield put(setAlertAction(error));
  }
}

//GET CURRENT COMMENT FROM DB
export function* getCurrentBlogCommentsSaga(action) {
  try {
    yield put(toggleCommentsLoadingAction(true));
    const comments = yield getDatafromDb(
      `blogComments/${action.payload.blogId}`
    );
    yield put(toggleCommentsLoadingAction(false));
    yield put(setCurrentBlogCommentsAction(comments));
  } catch (error) {
    yield put(setAlertAction(error));
  }
}

//ADD COMMENT IN DB
export function* addCommentInBlogInDb(action) {
  try {
    yield put(setDialogBoxPropsAction("Posting Comment..."));
    yield firebase
      .database()
      .ref("blogComments")
      .child(action.payload.blogId)
      .child(action.payload.comment.id)
      .set({
        ...action.payload.comment,
        username: action.payload.user.displayName,
        photoURL: action.payload.user.photoURL,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
      });
    const numberOfCommentsRef = yield firebase
      .database()
      .ref(`blogs/${action.payload.blogId}/comments`);
    yield numberOfCommentsRef.transaction((comments) => comments + 1);
    yield getCurrentBlogCommentsSaga(action);
    yield getBlogWithIdFromDb(action);
  } catch (error) {
    yield put(setAlertAction(error));
  }
}

//GET CURRENT LIKE FROM DB
export function* getCurrentBlogLikeSaga(action) {
  try {
    yield put(toggleLikeLoadingAction(true));
    const result = yield getDatafromDb(
      `blogLikes/${action.payload.blogId}/${action.payload.userId}`
    );
    yield put(toggleLikeLoadingAction(false));
    yield put(setCurrentBlogLikeAction(!!result));
  } catch (error) {
    yield put(setAlertAction(error));
  }
}

//SET CURRENT LIKE IN DB
export function* toggleCurrentBlogLikeInDb(action) {
  try {
    yield put(toggleLikeLoadingAction(true));
    const result = yield getDatafromDb(
      `blogLikes/${action.payload.blogId}/${action.payload.userId}`
    );
    const currentLikesRef = yield firebase
      .database()
      .ref(`blogs/${action.payload.blogId}/likes`);

    if (result) {
      yield firebase
        .database()
        .ref(`blogLikes/${action.payload.blogId}/${action.payload.userId}`)
        .remove();
      yield currentLikesRef.transaction((likes) => likes - 1);
    } else {
      yield firebase
        .database()
        .ref(`blogLikes/${action.payload.blogId}/${action.payload.userId}`)
        .set(true);
      yield currentLikesRef.transaction((likes) => likes + 1);
    }
    yield put(toggleLikeLoadingAction(false));
    yield getCurrentBlogLikeSaga(action);
    yield getBlogWithIdFromDb(action);
  } catch (error) {
    yield put(setAlertAction(error));
  }
}

//ADD BLOG IN DB
export function* addBlogInDb(action) {
  try {
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
  } catch (error) {
    yield put(setAlertAction(error));
  }
}

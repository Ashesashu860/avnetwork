import { put } from "redux-saga/effects";
import {
  setAlertAction,
  setDialogBoxPropsAction,
  toggleQueriesLoadingAction,
} from "../actions";
import {
  setAllQueriesForCurrentUserAction,
  setQueryCommentsAction,
  toggleQueryCommentsLoadingAction,
} from "../actions/query_actions";
import { getDatafromDb, getDatafromDbwhere } from "./saga_utilities";
import firebase from "../../config/firebase-config";

export function* getAllQueriesForCurrentUserSaga(action) {
  try {
    yield put(toggleQueriesLoadingAction(true));
    const queries = yield getDatafromDbwhere(
      "queries",
      "userId",
      action?.payload?.userId
    );
    yield put(
      setAllQueriesForCurrentUserAction(queries ? Object.values(queries) : null)
    );
    yield put(toggleQueriesLoadingAction(false));
  } catch (error) {
    yield put(setAlertAction(error));
  }
}

export function* postAQuerySaga(action) {
  try {
    yield put(setDialogBoxPropsAction("Posting your query..."));
    yield firebase
      .database()
      .ref("queries")
      .child(action.payload.query?.id)
      .set({
        ...action.payload.query,
        userId: action.payload.user?.uid,
        username: action.payload.user.displayName,
        photoURL: action.payload.user.photoURL,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
      });
    yield put(setDialogBoxPropsAction(""));
    yield getAllQueriesForCurrentUserSaga({
      payload: { userId: action.payload.user?.uid },
    });
  } catch (error) {
    yield put(setAlertAction(error));
  }
}

//Comments
export function* getQueryCommentsSaga(action) {
  try {
    yield put(toggleQueryCommentsLoadingAction(true));
    const queryComments = yield getDatafromDb(
      `queriesComments/${action?.payload?.queryId}`
    );
    yield console.log("saga", queryComments);
    yield put(
      setQueryCommentsAction(
        action?.payload?.queryId,
        queryComments ? Object.values(queryComments) : null
      )
    );
    yield put(toggleQueryCommentsLoadingAction(false));
  } catch (error) {
    yield put(setAlertAction(error));
  }
}

export function* postAQueryCommentSaga(action) {
  try {
    yield console.log("saga", action);
    yield put(setDialogBoxPropsAction("Posting your comment..."));
    yield firebase
      .database()
      .ref("queriesComments")
      .child(action.payload.queryId)
      .push({
        queryId: action.payload.queryId,
        queryComment: action.payload.queryComment,
        userId: action.payload.user?.uid,
        username: action.payload.user.displayName,
        photoURL: action.payload.user.photoURL,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
      });
    yield put(setDialogBoxPropsAction(""));
    yield getQueryCommentsSaga({
      payload: { queryId: action.payload.queryId },
    });
  } catch (error) {
    yield put(setAlertAction(error));
  }
}

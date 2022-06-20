import { put } from "redux-saga/effects";
import {
  setAlertAction,
  setDialogBoxPropsAction,
  toggleQueriesLoadingAction,
} from "../actions";
import { setAllQueriesForCurrentUserAction } from "../actions/query_actions";
import { getDatafromDbwhere } from "./saga_utilities";
import firebase from "../../config/firebase-config";

export function* getAllQueriesForCurrentUserSaga(action) {
  try {
    yield put(toggleQueriesLoadingAction(true));
    yield console.log("action?.payload?.userId", action?.payload?.userId);
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
    console.log("error", error);
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

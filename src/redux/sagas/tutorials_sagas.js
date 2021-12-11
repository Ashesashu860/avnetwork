import { put } from "redux-saga/effects";
import firebase from "../../config/firebase-config";
import { setDialogBoxPropsAction, setAllTutorialsAction } from "../actions";
import { getDatafromDb } from "./saga_utilities";

export function* uploadTutorialSaga(action) {
  yield put(setDialogBoxPropsAction("Posting Tutorial..."));
  const { id, title, category, userId } = action.payload.tutorial;

  const tutorialsDatabaseRef = yield firebase.database().ref(`tutorials/${id}`);

  yield tutorialsDatabaseRef.set({
    id,
    title,
    category,
    userId,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
  });

  yield put(
    setDialogBoxPropsAction(
      "Tutorial posted successfully.",
      {
        title: "OK",
        onButtonClick: (event) => {
          action.payload.history.push("/tutorials");
        },
      },
      true
    )
  );
}

export function* getAllTutorialsSaga() {
  yield put(setDialogBoxPropsAction("Getting all tutorials..."));
  const tutorials = yield getDatafromDb("/tutorials");
  yield put(setAllTutorialsAction(Object.values(tutorials)));
  yield put(setDialogBoxPropsAction(""));
}

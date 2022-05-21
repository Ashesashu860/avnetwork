import { call, put } from "redux-saga/effects";
import firebase from "../../config/firebase-config";
import {
  setDialogBoxPropsAction,
  setAllTutorialsAction,
  setAlertAction,
  likeTutorialSuccessAction,
} from "../actions";
import { getDatafromDb } from "./saga_utilities";

export function* uploadTutorialSaga(action) {
  try {
    yield put(setDialogBoxPropsAction("Posting Tutorial..."));
    const { id, title, category, userId } = yield action.payload.tutorial;

    const tutorialsDatabaseRef = yield firebase
      .database()
      .ref(`tutorials/${id}`);

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
        },
        true
      )
    );
    yield getAllTutorialsSaga();
  } catch (error) {
    yield put(setAlertAction(error));
  }
}

export function* getAllTutorialsSaga() {
  try {
    yield put(setDialogBoxPropsAction("Getting all tutorials..."));
    const tutorials = yield getDatafromDb("/tutorials");
    yield put(setAllTutorialsAction(Object.values(tutorials)));
    yield put(setDialogBoxPropsAction(""));
  } catch (error) {
    yield put(setAlertAction(error));
  }
}

export function* likeTutorialSaga(action) {
  try {
    const { tutorialId, userId } = yield action.payload;

    const likeRef = yield firebase
      .database()
      .ref(`tutorialLikes/${tutorialId}/${userId}`);
    const isLikeInDb = yield getDatafromDb(likeRef);

    const currentLikesRef = yield firebase
      .database()
      .ref(`tutorials/${tutorialId}/likes`);

    yield console.log("isLikeInDb", isLikeInDb);
    if (isLikeInDb) {
      yield likeRef.remove();
      yield currentLikesRef.transaction((likes) => likes - 1);
    } else {
      yield likeRef.set(true);
      yield currentLikesRef.transaction((likes) => likes + 1);
    }
    const newLike = yield getDatafromDb(
      firebase.database().ref(`tutorialLikes/${tutorialId}/${userId}`)
    );
    yield console.log("newLike", newLike);
    yield put(likeTutorialSuccessAction(!!newLike));
  } catch (error) {
    yield put(setAlertAction(error));
  }
}

export function* commentOnTutorialSaga(action) {}

import firebase from "../config/firebase-config";
import { setUserAction } from "./actions/actions";
import { takeLatest, put } from "@redux-saga/core/effects";

const isUserPresentInDb = (user) => {
  let result = null;
  if (user) {
    result = firebase
      .database()
      .ref(`users`)
      .child(user?.uid)
      .get()
      .then((snap) => snap.val());
  }
  return result;
};

function* checkUser() {
  const auth = yield firebase.auth();
  const result = yield auth.onAuthStateChanged((user) => {
    setUserAction(isUserPresentInDb(user));
  });
}

export function* rootSaga() {}

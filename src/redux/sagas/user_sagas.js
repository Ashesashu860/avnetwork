import firebase from "../../config/firebase-config";
import { put } from "redux-saga/effects";
import {
  setUserAction,
  setLoaderAction,
  setDialogBoxPropsAction,
  setAllUsersAction,
  setAlertAction,
} from "../actions";

const constructUserDataFromUserAuth = (user) =>
  user
    ? {
        uid: user?.uid,
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      }
    : null;

const getDatafromDb = (path) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(path)
      .on("value", (snap) => {
        resolve(snap?.val());
      });
  });
};

export function* getUserFromDb(user) {
  const result = yield getDatafromDb(`users/${user?.uid}`);
  return result;
}

export function* getAllUsersSaga() {
  yield put(setDialogBoxPropsAction("Getting all users..."));
  const result = yield getDatafromDb(`users`);
  yield put(setAllUsersAction(Object.values(result)));
  yield put(setDialogBoxPropsAction(""));
}

export function* setUserInDb(action) {
  yield put(setDialogBoxPropsAction("Signing Up..."));
  yield firebase
    .database()
    .ref(`users/${action.payload.user.uid}`)
    .set(action.payload.user);
  yield put(
    setDialogBoxPropsAction(
      "You are successfully registered",
      {
        title: "OK",
        onButtonClick: (event) => {
          action.payload.history.push("/");
        },
      },
      true
    )
  );
  yield put(setUserAction(action.payload.user));
}

const checkGoogleUser = () =>
  new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });

export function* checkUserAuth(action) {
  yield put(setLoaderAction(true));
  const user = yield checkGoogleUser();
  if (!user) {
    yield put(setLoaderAction(false));
    return;
  }
  const userInDb = yield getUserFromDb(user);
  if (!userInDb) {
    action.payload.history.push({
      pathname: "/signup",
      state: {
        user: constructUserDataFromUserAuth(user),
      },
    });
  } else {
    yield put(setUserAction(userInDb));
  }
  yield put(setLoaderAction(false));
}

export function* signInUser(action) {
  yield put(setLoaderAction(true));
  const { user } = yield firebase
    .auth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider());
  const userInDb = yield getUserFromDb(user);
  yield put(setLoaderAction(false));
  if (!userInDb) {
    action.payload.history.push({
      pathname: "/signup",
      state: {
        user: constructUserDataFromUserAuth(user),
      },
    });
  } else {
    yield put(setUserAction(userInDb));
  }
}

export function* signOutUser() {
  yield put(setDialogBoxPropsAction("Signing Out..."));
  yield firebase
    .auth()
    .signOut()
    .then((res) => res);
  yield put(setUserAction(null));
  yield put(setDialogBoxPropsAction(""));
}

//TOGGLE BLOG WRITE PERMISSION IN DB
export function* toggleBlogWritePermissionSaga(action) {
  try {
    yield put(setDialogBoxPropsAction("Please wait..."));
    const result = yield getDatafromDb(
      `users/${action.payload.userId}/canWriteBlogs`
    );
    // const canWriteBlogsRef = yield firebase
    //   .database()
    //   .ref(`users/${action.payload.userId}/canWriteBlogs`);
    // console.log("canWriteBlogsRef result", result);
    if (result) {
      yield firebase
        .database()
        .ref(`users/${action.payload.userId}/canWriteBlogs`)
        .set(false);
    } else {
      yield firebase
        .database()
        .ref(`users/${action.payload.userId}/canWriteBlogs`)
        .set(true);
    }
    yield put(setDialogBoxPropsAction(""));
    yield getAllUsersSaga();
  } catch (error) {
    setAlertAction(error);
  }
}

import firebase from "../../config/firebase-config";
import { put } from "redux-saga/effects";
import {
  setUserAction,
  setLoaderAction,
  setDialogBoxPropsAction,
} from "../actions";

const constructUserDataFromUserAuth = (user) => ({
  uid: user.uid,
  displayName: user.displayName,
  email: user.email,
  photoURL: user.photoURL,
});

export function* getUserFromDb(user) {
  const result = yield firebase.database().ref(`users`).child(user?.uid).get();
  return result?.val();
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

// export function* checkUserAuth(action) {
//   console.log("check saga");
//   yield put(setLoaderAction(true));
//   const user = yield checkGoogleUser();
//   console.log("googleUser", user);
//   const userInDb = yield getUserFromDb(user);
//   console.log("userInDb", userInDb);
//   if (!userInDb) {
//     action.payload.history.push({
//       pathname: "/signup",
//       state: {
//         user: constructUserDataFromUserAuth(user),
//       },
//     });
//   } else {
//     yield put(setUserAction(userInDb));
//   }
//   yield put(setLoaderAction(false));
// }

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

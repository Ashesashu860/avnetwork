import firebase from "../../config/firebase-config";
import { put } from "redux-saga/effects";
import {
  setUserAction,
  setLoaderAction,
  setDialogBoxPropsAction,
  setAllUsersAction,
  setAlertAction,
} from "../actions";
import { v4 as uuidv4 } from "uuid";

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

  const newImages = yield [...action.payload.user.newImages];

  const userDatabaseRef = yield firebase
    .database()
    .ref(`users/${action.payload.user.uid}`);

  const {
    category,
    displayName,
    email,
    phoneNumber,
    photoURL,
    address,
    serviceLocations,
    uid,
  } = action.payload.user;

  yield userDatabaseRef.set({
    category,
    displayName,
    email,
    phoneNumber,
    photoURL,
    address,
    serviceLocations,
    uid,
  });

  if (newImages.length > 0) {
    const userWorkImagesStorageRef = yield firebase
      .storage()
      .ref(`userWorkImages/${action.payload.user.uid}`);
    for (const image of newImages) {
      const imageId = uuidv4();
      const imageStorageRef = yield userWorkImagesStorageRef.child(imageId);
      yield imageStorageRef.put(image);
      const imageDownloadURL = yield imageStorageRef.getDownloadURL();
      yield userDatabaseRef
        .child("userWorkImages")
        .child(imageId)
        .set(imageDownloadURL);
    }
  }

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
  const updatedUser = yield getUserFromDb(action.payload.user);
  yield put(setUserAction(updatedUser));
}

export function* updateUserSaga(action) {
  yield put(setDialogBoxPropsAction("Updating User..."));

  const userDatabaseRef = yield firebase
    .database()
    .ref(`users/${action.payload.user.uid}`);

  const {
    category,
    displayName,
    email,
    phoneNumber,
    photoURL,
    uid,
    userWorkImages,
    newImages,
    deletedImages,
    address,
    serviceLocations,
  } = action.payload.user;

  yield userDatabaseRef.set({
    category,
    displayName,
    email,
    phoneNumber,
    photoURL,
    uid,
    userWorkImages,
    address,
    serviceLocations,
  });

  const userWorkImagesStorageRef = yield firebase
    .storage()
    .ref(`userWorkImages/${action.payload.user.uid}`);

  if (deletedImages?.length > 0) {
    for (const image of deletedImages) {
      yield userWorkImagesStorageRef.child(image).delete();
    }
  }

  if (newImages.length > 0) {
    const userWorkImagesStorageRef = yield firebase
      .storage()
      .ref(`userWorkImages/${action.payload.user.uid}`);
    for (const image of newImages) {
      const imageId = uuidv4();
      const imageStorageRef = yield userWorkImagesStorageRef.child(imageId);
      yield imageStorageRef.put(image);
      const imageDownloadURL = yield imageStorageRef.getDownloadURL();
      yield userDatabaseRef
        .child("userWorkImages")
        .child(imageId)
        .set(imageDownloadURL);
    }
  }

  yield put(
    setDialogBoxPropsAction(
      "User updated successfully",
      {
        title: "OK",
        onButtonClick: (event) => {
          action.payload.history.push("/profile");
        },
      },
      true
    )
  );
  const updatedUser = yield getUserFromDb(action.payload.user);
  yield put(setUserAction(updatedUser));
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

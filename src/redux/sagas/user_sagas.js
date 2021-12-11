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
import { getDatafromDbwhere, getDatafromDb } from "./saga_utilities";

const constructUserDataFromUserAuth = (user) =>
  user
    ? {
        uid: user?.uid,
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      }
    : null;

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

  console.log("userWorkImages", userWorkImages);
  yield userDatabaseRef.set({
    category,
    displayName,
    email,
    phoneNumber,
    photoURL,
    uid,
    ...(userWorkImages && { userWorkImages: userWorkImages }),
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

//this will delete profile and market place products
export function* deleteUserSaga(action) {
  yield put(setDialogBoxPropsAction("Deleting your profile..."));
  //deleting user profile from db
  yield firebase.database().ref(`users`).child(action.payload.userId).remove();

  //deleting userWorkImages from storage
  const userWorkImages = yield firebase
    .storage()
    .ref("userWorkImages")
    .child(action.payload.userId)
    .listAll();
  for (const userWorkImage of userWorkImages.items) {
    yield firebase
      .storage()
      .ref("userWorkImages")
      .child(action.payload.userId)
      .child(userWorkImage.name)
      .delete();
  }
  //deleting marketPlaceProducts from storage
  const products = yield getDatafromDbwhere(
    "marketPlaceProducts",
    "userId",
    action.payload.userId
  );
  const marketPlaceProductsDatabaseRef = yield firebase
    .database()
    .ref("marketPlaceProducts");
  const marketPlaceProductsStorageRef = yield firebase
    .storage()
    .ref("marketPlaceProducts");
  const productKeys = yield products && Object.keys(products);
  if (productKeys) {
    for (const productKey of productKeys) {
      //deleting product from db
      yield marketPlaceProductsDatabaseRef.child(productKey).remove();
      //listing all images of product
      const productImages = yield marketPlaceProductsStorageRef
        .child(productKey)
        .listAll();
      //filter product image names
      const productNames = yield productImages.items.map((image) => image.name);
      //iterate over all product images and delete them
      for (const productName of productNames) {
        yield yield marketPlaceProductsStorageRef
          .child(productKey)
          .child(productName)
          .delete();
      }
    }
  }
  yield put(
    setDialogBoxPropsAction(
      "User deleted successfully",
      {
        title: "OK",
        onButtonClick: (event) => {
          action.payload.history.push("/");
        },
      },
      true
    )
  );
  yield signOutUser();
}

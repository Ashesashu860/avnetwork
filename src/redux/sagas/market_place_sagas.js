import firebase from "../../config/firebase-config";
import {
  setAllMarketPlaceProducts,
  setDialogBoxPropsAction,
  setCurrentMarketPlaceProductAction,
  setCurrentProductOwnerAction,
  //INTERESTED ACTIONS
  interestedUsersForProductLoadingAction,
  setAllInterestedUsersForProductInStateAction,
  toggleProductsLoadingAction,
} from "../actions";
import { put } from "redux-saga/effects";
import { getDatafromDb } from "./saga_utilities";
// import { getDatafromDb } from "./saga_utilities";

export function* addProductInDbSaga(action) {
  yield put(setDialogBoxPropsAction("Posting Product..."));

  const {
    id,
    title,
    location,
    sellarName,
    category,
    stock,
    brand,
    images,
    description,
    price,
  } = yield action.payload.product;
  const productDatabaseRef = yield firebase
    .database()
    .ref(`marketPlaceProducts/${id}`);
  const productStorageRef = yield firebase
    .storage()
    .ref(`marketPlaceProducts/${id}`);

  yield productDatabaseRef.set({
    id,
    title,
    location,
    brand,
    description,
    sellarName,
    category,
    stock,
    images,
    price,
    userId: action.payload.userId,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
  });

  if (action?.payload?.product?.newImages) {
    for (const image of action.payload.product.newImages) {
      const imageStorageRef = yield productStorageRef.child(image.name);
      yield imageStorageRef.put(image);
      const imageDownloadURL = yield imageStorageRef.getDownloadURL();
      yield productDatabaseRef.child("images").push(imageDownloadURL);
    }
  }

  yield put(
    setDialogBoxPropsAction(
      "Product posted successfully.",
      {
        title: "OK",
        onButtonClick: (event) => {
          action.payload.history.push("/market_place");
        },
      },
      true
    )
  );
}

export function* getAllMarketPlaceProductsSaga() {
  yield put(toggleProductsLoadingAction(true));
  const allProducts = yield getDatafromDb("/marketPlaceProducts");
  yield put(setAllMarketPlaceProducts(Object.values(allProducts)));
}

export function* getCurrentMarketPlaceProductSaga(action) {
  yield put(setDialogBoxPropsAction("Getting product details..."));
  const currentProduct = yield getDatafromDb(
    `/marketPlaceProducts/${action.payload.productId}`
  );
  yield put(setCurrentMarketPlaceProductAction(currentProduct));
  yield put(setDialogBoxPropsAction(""));
}

export function* setInterestForProductInDbSaga(action) {
  const interestedUsersRef = yield firebase
    .database()
    .ref(`/marketPlaceProducts/${action.payload.productId}/interestedUsers`);
  yield interestedUsersRef.on("child_changed", (snap) => {
    console.log("CHANGE");
  });
  const interestedRef = yield firebase
    .database()
    .ref(
      `/marketPlaceProducts/${action.payload.productId}/interestedUsers/${action.payload.userId}`
    );
  yield action.payload.interested
    ? yield interestedRef.set(true)
    : yield interestedRef.remove();
  yield getCurrentMarketPlaceProductSaga(action);
  // yield getAllInterestedUsersForProductSaga(action);
}

export function* getAllInterestedUsersForProductSaga(action) {
  yield put(interestedUsersForProductLoadingAction(true));
  const interestedUserIds = yield getDatafromDb(
    `/marketPlaceProducts/${action.payload.productId}/interestedUsers`
  );
  const interestedUsers = [];
  for (const interestedUserId in interestedUserIds) {
    const user = yield getDatafromDb(`/users/${interestedUserId}`);
    yield interestedUsers.push(user);
  }
  yield put(setAllInterestedUsersForProductInStateAction(interestedUsers));
  yield put(interestedUsersForProductLoadingAction(false));
}

export function* getCurrentProductOwnerSaga(action) {
  const currentProductOwner = yield getDatafromDb(
    `users/${action.payload.userId}`
  );
  yield put(setCurrentProductOwnerAction(currentProductOwner));
}

export function* deleteMarketPlaceProductSaga(action) {
  yield put(setDialogBoxPropsAction("Deleting Product..."));
  //delete product images
  const productImages = yield firebase
    .storage()
    .ref("marketPlaceProducts")
    .child(action.payload.productId)
    .listAll();
  for (const userWorkImage of productImages.items) {
    yield firebase
      .storage()
      .ref("marketPlaceProducts")
      .child(action.payload.productId)
      .child(userWorkImage.name)
      .delete();
  }
  //delete product from db
  yield firebase
    .database()
    .ref(`/marketPlaceProducts/${action.payload.productId}`)
    .remove();
  yield put(
    setDialogBoxPropsAction(
      "Product deleted successfully.",
      {
        title: "OK",
        onButtonClick: (event) => {
          action.payload.history.push("/market_place");
        },
      },
      true
    )
  );
}

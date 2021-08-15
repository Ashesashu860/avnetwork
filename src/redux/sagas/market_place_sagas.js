import firebase from "../../config/firebase-config";
import {
  setAllMarketPlaceProducts,
  setDialogBoxPropsAction,
  setCurrentMarketPlaceProductAction,
  //INTERESTED ACTIONS
  interestedUsersForProductLoadingAction,
  setAllInterestedUsersForProductInStateAction,
} from "../actions";
import { put } from "redux-saga/effects";
import { getDatafromDb } from "./saga_utilities";
// import { getDatafromDb } from "./saga_utilities";

export function* addProductInDbSaga(action) {
  yield put(setDialogBoxPropsAction("Posting Product..."));

  const { id, title, brand, description, price } = yield action.payload.product;
  const productDatabaseRef = yield firebase
    .database()
    .ref(`marketPlaceProducts/${id}`);
  const productStorageRef = yield firebase
    .storage()
    .ref(`marketPlaceProducts/${id}`);

  yield productDatabaseRef.set({
    id,
    title,
    brand,
    description,
    price,
    userId: action.payload.userId,
  });

  for (const image of action.payload.product.images) {
    const imageStorageRef = yield productStorageRef.child(image.name);
    yield imageStorageRef.put(image);
    const imageDownloadURL = yield imageStorageRef.getDownloadURL();
    yield productDatabaseRef.child("images").push(imageDownloadURL);
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
  yield put(setDialogBoxPropsAction("Getting all products..."));
  const allProducts = yield getDatafromDb("/marketPlaceProducts");
  yield put(setAllMarketPlaceProducts(Object.values(allProducts)));
  yield put(setDialogBoxPropsAction(""));
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

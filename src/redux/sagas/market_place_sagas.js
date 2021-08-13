import firebase from "../../config/firebase-config";
import {
  toggleProductImageUploadLoading,
  setAlertAction,
  setCurrentProjectImagesInState,
} from "../actions";
import { put } from "redux-saga/effects";
import { getDatafromDb } from "./saga_utilities";

function* getCurrentProductImagesSaga(action) {
  const allImages = yield getDatafromDb(
    `marketPlaceProducts/${action.payload.productId}`
  );
  yield setCurrentProjectImagesInState(Object.values(allImages));
}

//UPLOAD PRODUCT IMAGE IN STORAGE AND URL IN DB
export function* uploadProductImageSaga(action) {
  yield put(toggleProductImageUploadLoading(true));

  const productStorageRef = yield firebase
    .storage()
    .ref(`marketPlaceProduct/${action.payload.productId}`);
  const imageStorageRef = yield productStorageRef.child(
    action.payload.imageObject.name
  );

  console.log("ImageRef", imageStorageRef);

  yield imageStorageRef.put(action.payload.imageObject);
  const downloadURL = yield imageStorageRef.getDownloadURL();

  yield firebase
    .database()
    .ref(`marketPlaceProducts/${action.payload.productId}/images`)
    .push(downloadURL);
  yield put(toggleProductImageUploadLoading(false));
  yield getCurrentProductImagesSaga(action);
  //   yield imageRef.put(action.payload.imageObject).on(
  //     "state_changed",
  //     (snap) => {
  //       let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
  //       console.log("ImageRef percentage", percentage);
  //     },
  //     (error) => {
  //       console.log("ERROR", error);
  //       put(setAlertAction(error));
  //     },
  //     () => {
  //       const downloadURL = imageRef.getDownloadURL();
  //       console.log("downloadURL", downloadURL);
  //       put(toggleProductImageUploadLoading(false));
  //       put(uploadProductImageSuccess(downloadURL));
  //       firebase
  //         .database()
  //         .ref(`marketPlaceProducts/${action.payload.productId}/images`)
  //         .push(downloadURL);
  //     }
  //   );
}

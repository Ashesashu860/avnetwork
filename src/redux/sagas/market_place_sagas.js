import firebase from "../../config/firebase-config";
import { setDialogBoxPropsAction } from "../actions";
import { put } from "redux-saga/effects";
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

// function* getCurrentProductImagesSaga(action) {
//   const allImages = yield getDatafromDb(
//     `marketPlaceProducts/${action.payload.productId}`
//   );
//   yield setCurrentProjectImagesInState(Object.values(allImages));
// }

// //UPLOAD PRODUCT IMAGE IN STORAGE AND URL IN DB
// export function* uploadProductImageSaga(action) {
//   yield put(toggleProductImageUploadLoading(true));

//   const productStorageRef = yield firebase
//     .storage()
//     .ref(`marketPlaceProduct/${action.payload.productId}`);
//   const imageStorageRef = yield productStorageRef.child(
//     action.payload.imageObject.name
//   );

//   console.log("ImageRef", imageStorageRef);

//   yield imageStorageRef.put(action.payload.imageObject);
//   const downloadURL = yield imageStorageRef.getDownloadURL();

//   yield firebase
//     .database()
//     .ref(`marketPlaceProducts/${action.payload.productId}/images`)
//     .push(downloadURL);
//   yield put(toggleProductImageUploadLoading(false));
//   yield getCurrentProductImagesSaga(action);
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
//}

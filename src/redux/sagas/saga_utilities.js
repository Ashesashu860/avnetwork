import firebase from "../../config/firebase-config";

//GET DATA FROM DB
export const getDatafromDb = (path) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(path)
      .on("value", (snap) => {
        resolve(snap?.val());
      });
  });
};

//GET DATA FROM DB WHERE
export const getDatafromDbwhere = (path, orderBy, equalTo) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(path)
      .orderByChild(orderBy)
      .equalTo(equalTo)
      .on("value", (snap) => resolve(snap?.val()));
  });
};

//SET DATA IN DB
export const setDataInDb = (path, objectToSave) => {
  return firebase.database().ref(path).set(objectToSave);
};

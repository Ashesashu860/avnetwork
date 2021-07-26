import { useState, useEffect, createContext } from "react";
import firebase from "../config/firebase-config";
import { Loading } from "../pages";
export const AuthContext = createContext();

export const AuthProvider = ({ children, history }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      setUser(await isUserPresentInDb(user));
      setLoading(false);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

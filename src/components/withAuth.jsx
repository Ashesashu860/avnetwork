// import React, { useState, useEffect } from "react";
// import firebase from "../config/firebase-config";

// export const withAuth = (Component) => {
//   return (props) => {
//     const [user, setUser] = useState(null);
//     useEffect(() => {
//       firebase.auth().onAuthStateChanged((user) => setUser(user));
//     }, []);
//     return <Component user={user} {...props} />;
//   };
// };

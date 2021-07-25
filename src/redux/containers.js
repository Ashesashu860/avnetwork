import React, { useEffect, useState } from "react";
import firebase from "../config/firebase-config";
import { connect } from "react-redux";
import { setUserAction } from "./actions";

export const withAuth = (Component) => {
  const mapStateToProps = (state) => state;
  const mapDispatchToProps = (dispatch) => ({
    dispatchSetUserAction: (user) => dispatch(setUserAction(user)),
  });
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )((props) => {
    useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
        props.dispatchSetUserAction(user);
      });
    }, []);
    return <Component {...props} />;
  });
};

// export const withAuth = (Component) => {
//   const mapStateToProps = (state) => state;
//   const mapDispatchToProps = (dispatch) => ({
//     dispatchSetUserAction: (user) => dispatch(setUserAction(user)),
//   });
//   return connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )((props) => {
//     const [loading, setLoading] = useState(true);
//     useEffect(() => {
//       firebase.auth().onAuthStateChanged((user) => {
//         console.log("onAuthStateChanged", user);
//         props.dispatchSetUserAction(user);
//         setLoading(!user);
//       });
//     }, []);
//     return <Component loading={loading} {...props} />;
//   });
// };

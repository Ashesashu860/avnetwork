import "./App.css";
import React from "react";
import "react-quill/dist/quill.snow.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Main, Loading } from "./pages";
import { withAuth } from "./redux/containers";

const App = (props) => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;

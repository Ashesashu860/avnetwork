import "./App.css";
import React from "react";
import "react-quill/dist/quill.snow.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Main } from "./pages";

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;

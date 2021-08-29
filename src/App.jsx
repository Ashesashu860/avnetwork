import "./App.css";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Main } from "./pages";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );
};

export default App;

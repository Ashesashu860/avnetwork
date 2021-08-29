import "./App.css";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Main } from "./pages";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  useEffect(() => {
    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.style.setProperty("--vh", `${vh}px`);
    });
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );
};

export default App;

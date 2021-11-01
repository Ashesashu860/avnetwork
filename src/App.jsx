import "./App.css";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Main } from "./pages";
import { BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

const App = () => {
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--height",
      window.innerHeight + "px"
    );
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Helmet>
          <title>AVnetwork Home</title>
          <meta
            name="description"
            content="Get to know about latest technologies in audio/video products. Buy/Sell audio/video products like Speakers, Wires, Audio Cables, Microphones(Mic) etc."
          />
          <meta
            name="keywords"
            content="Audio, Video, Sound, Speaker, Microphone, Wires, Cables, Mic, Digital, Armoured Cables, AWG, Analog, Blog, Displays, Lightning, Truss, Trussing Systems, Connectors, Amplifiers, Panels, Market Place, Audiophile, Wire guage"
          />
        </Helmet>
        <Main />
      </BrowserRouter>
    </Provider>
  );
};

export default App;

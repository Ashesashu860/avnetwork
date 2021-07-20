import "./App.css";
import { Navbar, Footer } from "./components";
import { BrowserRouter, Route } from "react-router-dom";
import {
  Homepage,
  BlogList,
  BlogLandingPage,
  BlogCreate,
  ViewBlog,
  Network,
  MarketPlace,
  JobPortal,
  Tutorials,
  AboutUs,
  ContactUs,
  Login,
  Register,
} from "./pages";
import React from "react";
import "react-quill/dist/quill.snow.css";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Route exact path="/" component={Homepage} />
      <Route exact path="/blog" component={BlogLandingPage} />
      <Route exact path="/blogs" component={BlogList} />
      <Route exact path="/blog-create" component={BlogCreate} />
      <Route exact path="/network" component={Network} />
      <Route exact path="/market_place" component={MarketPlace} />
      <Route exact path="/job_portal" component={JobPortal} />
      <Route exact path="/tutorials" component={Tutorials} />
      <Route exact path="/about_us" component={AboutUs} />
      <Route exact path="/contact_us" component={ContactUs} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Register} />
      <Footer />
    </BrowserRouter>
  );
};

export default App;

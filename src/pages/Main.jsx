import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Footer, DialogBox, Alert } from "../components";
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
  Loading,
} from ".";
import { checkUserAuth } from "../redux/actions";
import { useHistory } from "react-router-dom";

const mapState = (state) => ({
  dialogBoxProps: state.dialogBoxProps,
  alertProps: state.alertProps,
  isLoading: state.isLoading,
});

export const Main = () => {
  const { dialogBoxProps, alertProps, isLoading } = useSelector(mapState);
  const [alertOpen, setAlertOpen] = useState(!alertProps.title);
  const onAlertClose = () => setAlertOpen(false);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setAlertOpen(!alertProps.title);
    dispatch(checkUserAuth(history));
  }, []);

  return (
    <BrowserRouter>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <Route exact path="/" component={Homepage} />
          <Route exact path="/blog" component={BlogLandingPage} />
          <Route exact path="/blogs" component={BlogList} />
          <Route exact path="/blogs/:id" component={ViewBlog} />
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
          <DialogBox {...dialogBoxProps} />
          <Alert {...alertProps} onClose={onAlertClose} open={alertOpen} />
        </>
      )}
    </BrowserRouter>
  );
};

{
  /* <BrowserRouter>
      <Navbar />
      <Route exact path="/" component={Homepage} />
      <Route exact path="/blog" component={BlogLandingPage} />
      <Route exact path="/blogs" component={BlogList} />
      <Route exact path="/blogs/:id" component={ViewBlog} />
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
      <DialogBox {...dialogBoxProps} />
      <Alert {...alertProps} onClose={onAlertClose} open={alertOpen} />
      {isLoading && <Loading />}
    </BrowserRouter> */
}

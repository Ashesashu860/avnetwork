import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Footer, DialogBox, Alert } from "../components";
import { Route, Switch } from "react-router-dom";
import {
  Homepage,
  BlogList,
  BlogLandingPage,
  BlogCreate,
  ViewBlog,
  MarketPlace,
  JobPortal,
  Tutorials,
  AboutUs,
  ContactUs,
  Login,
  Register,
  Loading,
  Admin,
  CreateProduct,
  ViewProduct,
  Profile,
  PageNotFound,
  UnderConstruction,
  EditProfile,
  Networks,
  ViewUser,
  MarketPlaceHome,
  BlogHome,
} from ".";
import { checkUserAuth } from "../redux/actions";
import { useHistory } from "react-router-dom";

const mapState = (state) => ({
  dialogBoxProps: state.root.dialogBoxProps,
  alertProps: state.root.alertProps,
  isLoading: state.root.isLoading,
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
    const abortController = new AbortController();
    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/blog" component={BlogLandingPage} />
            <Route exact path="/blogs" component={BlogList} />
            <Route exact path="/blogs/:id" component={ViewBlog} />
            <Route exact path="/blog-create" component={BlogCreate} />
            <Route exact path="/market_place" component={MarketPlaceHome} />
            <Route exact path="/job_portal" component={UnderConstruction} />
            <Route exact path="/tutorials" component={UnderConstruction} />
            <Route exact path="/about_us" component={UnderConstruction} />
            <Route exact path="/contact_us" component={UnderConstruction} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Register} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/post_product" component={CreateProduct} />
            <Route exact path="/products/:id" component={ViewProduct} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/edit_profile" component={EditProfile} />
            <Route exact path="/networks" component={Networks} />
            <Route exact path="/view_user" component={ViewUser} />
            <Route component={PageNotFound} />
          </Switch>
          <Footer />
          <DialogBox {...dialogBoxProps} />
          <Alert {...alertProps} onClose={onAlertClose} open={alertOpen} />
        </>
      )}
    </>
  );
};

import React, { useEffect } from "react";
import "./profile.css";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { StyledFab } from "../../components";
import { ViewUserTemplate } from "./ViewUserTemplate";
import { deleteUserAction } from "../../redux/actions";

const mapState = (state) => ({ currentUser: state.users.currentUser });

export const Profile = () => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {currentUser ? (
        <div className="wrapper">
          <ViewUserTemplate user={currentUser} />
          <div className="center" style={{ margin: "1rem 0" }}>
            <StyledFab
              variant="extended"
              bold
              primary
              onClick={() =>
                history.push({
                  pathname: "/edit_profile",
                  state: currentUser,
                })
              }
            >
              Edit Profile
            </StyledFab>
            <StyledFab
              variant="extended"
              bold
              secondary
              onClick={() =>
                dispatch(deleteUserAction(currentUser.uid, history))
              }
              style={{ marginLeft: "1rem" }}
            >
              Delete Profile
            </StyledFab>
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

import React from "react";
import "./profile.css";
import { Avatar, IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import { Redirect } from "react-router-dom";

const mapState = (state) => ({ currentUser: state.users.currentUser });

export const Profile = () => {
  const { currentUser } = useSelector(mapState);

  return (
    <>
      {currentUser ? (
        <div className="wrapper">
          <div className="header">
            <div className="profile_photo">
              <Avatar style={{ height: "6.5rem", width: "6.5rem" }}>
                <img
                  src={currentUser?.photoURL}
                  alt={currentUser?.displayName?.charAt(0)}
                  style={{ maxHeight: "100%" }}
                />
              </Avatar>
            </div>
            <div
              className="center profile_content"
              style={{ flexDirection: "column" }}
            >
              <h1>{currentUser?.displayName}</h1>
              <p style={{ fontSize: "1.2rem" }}>{currentUser?.category}</p>
              <div className="profile_list_contianer">
                <div
                  className="center"
                  style={{ justifyContent: "flex-start" }}
                >
                  <IconButton
                    disableRipple
                    style={{ backgroundColor: "#ccc", marginRight: "1rem" }}
                  >
                    <EmailIcon />
                  </IconButton>
                  {currentUser?.email}
                </div>
                <div
                  className="center"
                  style={{ justifyContent: "flex-start" }}
                >
                  <IconButton
                    disableRipple
                    style={{ backgroundColor: "#ccc", marginRight: "1rem" }}
                  >
                    <PhoneIcon />
                  </IconButton>
                  {currentUser?.phoneNumber}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

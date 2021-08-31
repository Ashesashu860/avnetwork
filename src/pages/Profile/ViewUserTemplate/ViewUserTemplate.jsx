import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import "./view_user_template.css";

export const ViewUserTemplate = ({ user }) => {
  return (
    <>
      <div className="header">
        <Avatar
          className="profile_photo"
          style={{ height: "6.5rem", width: "6.5rem" }}
        >
          <img
            src={user?.photoURL}
            alt={user?.displayName?.charAt(0)}
            style={{ maxHeight: "100%" }}
          />
        </Avatar>
      </div>
      <div
        className="center profile_content"
        style={{ flexDirection: "column" }}
      >
        <h1>{user?.displayName}</h1>
        <p style={{ fontSize: "1.2rem" }}>{user?.category}</p>
        <div className="profile_list_contianer">
          <div className="center" style={{ justifyContent: "flex-start" }}>
            <IconButton
              disableRipple
              style={{ backgroundColor: "#ccc", marginRight: "1rem" }}
            >
              <EmailIcon />
            </IconButton>
            {user?.email || "Email not found"}
          </div>
          <div className="center" style={{ justifyContent: "flex-start" }}>
            <IconButton
              disableRipple
              style={{ backgroundColor: "#ccc", marginRight: "1rem" }}
            >
              <PhoneIcon />
            </IconButton>
            {user?.phoneNumber || "Contact not found"}
          </div>
        </div>
      </div>
    </>
  );
};

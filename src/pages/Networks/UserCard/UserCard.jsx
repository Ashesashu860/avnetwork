import React from "react";
import "./user_card.css";
import { Avatar, Card } from "@material-ui/core";

export const UserCard = ({ user, onClick }) => {
  return (
    <Card className="center user_card_container" onClick={onClick}>
      <div className="center user_card_sub_container">
        <Avatar style={{ height: "6.5rem", width: "6.5rem" }}>
          <img
            src={user?.photoURL}
            alt={user?.displayName?.charAt(0)}
            style={{ maxHeight: "100%" }}
          />
        </Avatar>
        <h3>{user?.displayName}</h3>
        <span>{user?.category}</span>
        <span>{user?.email || "Email not found"}</span>
        <span>{user?.phoneNumber || "Contact not found"}</span>
      </div>

      <div
        className="center"
        style={{
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
          backgroundColor: "var(--primary)",
          color: "#fff",
          padding: "0.5rem 0",
          justifySelf: "flex-end",
          width: "100%",
        }}
      >
        VIEW DETAILS
      </div>
    </Card>
  );
};

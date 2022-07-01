import React from "react";
import styled from "styled-components";
import { Grid, Avatar } from "@material-ui/core";

const StyledCard = styled.div`
  padding: 1.5rem;
  margin: 0.5rem 0;
  background-color: #eee;
  width: 100%;
  border-radius: 8px !important;
`;

export const CommentCard = ({ username, date, comment, photoURL }) => {
  return (
    <StyledCard>
      <Grid container wrap="nowrap">
        <Avatar
          style={{
            maxHeight: "2.2rem",
            maxWidth: "2.2rem",
            alignSelf: "flex-start",
            marginRight: "1rem",
          }}
        >
          <img
            src={photoURL}
            alt={username?.charAt(0)}
            style={{ maxHeight: "100%" }}
          />
        </Avatar>
        <Grid container>
          <Grid
            container
            wrap="nowrap"
            style={{ justifyContent: "space-between" }}
          >
            <h5>{username}</h5>
            <span style={{ fontSize: "0.9rem" }}>{date}</span>
          </Grid>
          <div
            style={{
              width: "100%",
              marginTop: "0.5rem",
            }}
          >
            {comment}
          </div>
        </Grid>
      </Grid>
    </StyledCard>
  );
};

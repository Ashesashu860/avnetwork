import React from "react";
import styled from "styled-components";
import { Grid, Avatar } from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import { StyledFab } from "../../components";

const StyledCard = styled.div`
  padding: 1.5rem;
  margin: 0.5rem 0;
  background-color: #eee;
  width: 100%;
  border-radius: 8px !important;
`;

export const InterestedCard = ({
  displayName,
  photoURL,
  phoneNumber,
  style,
}) => {
  return (
    <StyledCard style={style}>
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
            alt={displayName?.charAt(0)}
            style={{ maxHeight: "100%" }}
          />
        </Avatar>
        <Grid container>
          <Grid
            container
            wrap="nowrap"
            style={{ justifyContent: "space-between" }}
          >
            <h5>{displayName}</h5>
            {/* <span style={{ fontSize: "0.9rem" }}>{date}</span> */}
          </Grid>
          <div
            className="center"
            style={{
              width: "100%",
              marginTop: "0.5rem",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            I am interested in your product. Please contact me.
            <a
              href={`tel:${phoneNumber}`}
              style={{ textDecoration: "none", marginTop: "1rem" }}
            >
              <StyledFab
                variant="extended"
                bold
                primary
                style={{ height: "3rem" }}
              >
                <PhoneIcon
                  style={{
                    maxWidth: "1.4rem",
                    marginRight: "0.5rem",
                    backgroundColor: "var(--secondary)",
                    padding: "4px",
                    borderRadius: "50%",
                    color: "#000",
                  }}
                />
                Call me
              </StyledFab>
            </a>
          </div>
        </Grid>
        {/* <IconButton>
    <DeleteIcon />
  </IconButton> */}
      </Grid>
    </StyledCard>
  );
};

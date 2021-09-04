import React from "react";
import styled from "styled-components";
import { Grid, Avatar } from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { StyledFab } from "../../components";

const StyledCard = styled.div`
  padding: 1.5rem;
  margin: 0.5rem 0;
  background-color: #eee;
  width: 100%;
  border-radius: 8px !important;
`;

const StyledCardContent = styled.div`
  align-items: flex-start;
  flex-direction: column;
  & > *:not(:last-child) {
    margin-bottom: 0.5rem;
  }
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
        <StyledCardContent className="center">
          <h5>{displayName}</h5>
          <p>I am interested in your product. Please contact me.</p>
          <div style={{ float: "left" }}>
            <a
              href={`tel:${phoneNumber}`}
              style={{ textDecoration: "none", marginRight: "1rem" }}
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
            <a
              href={`https://api.whatsapp.com/send?phone=${phoneNumber}&text=I am interested`}
              style={{ textDecoration: "none" }}
            >
              <StyledFab
                bold
                primary
                style={{
                  height: "3rem",
                  maxWidth: "3rem",
                }}
              >
                <WhatsAppIcon />
              </StyledFab>
            </a>
          </div>
        </StyledCardContent>
        {/* <IconButton>
    <DeleteIcon />
  </IconButton> */}
      </Grid>
    </StyledCard>
  );
};

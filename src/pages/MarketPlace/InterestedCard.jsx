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
  productTitle,
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
                bold
                primary
                style={{ height: "3rem", maxWidth: "3rem" }}
              >
                <PhoneIcon />
              </StyledFab>
            </a>
            <a
              href={`https://api.whatsapp.com/send?phone=+91${phoneNumber}&text=Hi, I saw your interest in ${productTitle} from avnetwork.in. Let's discuss more about it.`}
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

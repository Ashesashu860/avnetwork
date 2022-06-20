import React from "react";
import styled from "styled-components";
import { Grid, Divider } from "@material-ui/core";
import { Logo } from ".";
const StyledFooter = styled.div`
  background-color: var(--primary);
  padding: 3rem 7rem 2rem 6rem;
  line-height: 1.5rem;
  color: white;
  & * {
    color: white;
  }

  & p {
    font-size: 0.9rem;
  }
  & h4 {
    font-family: "Montserrat", sans-serif !important;
    font-weight: 700;
    margin-bottom: 8px;
  }
`;

export const Footer = () => {
  return (
    <StyledFooter>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        spacing={2}
      >
        <Grid item>
          <Logo primaryColor="#fff" secondaryColor="#fff" />
          <p>A single platform for all your needs.</p>
        </Grid>
        <Grid item>
          <h4>Connect with Us</h4>
          <p>Instagram</p>
          <p>Facebook</p>
          <p>Twitter</p>
        </Grid>
        <Grid item>
          <h4>About</h4>
          <p>Contact Us</p>
          <p>About Us</p>
          <p>Privacy Policy</p>
          <p>Terms of Use</p>
        </Grid>
        <Grid item>
          <h4>Useful Links</h4>
          <p>Blog</p>
          <p>Market Place</p>
          <p>Job Portal</p>
        </Grid>
      </Grid>
      <Divider style={{ backgroundColor: "#fff", margin: "2rem 0" }} />
      <p>Copyright @ 2021 AVnetwork. All rights reserved.</p>
    </StyledFooter>
  );
};

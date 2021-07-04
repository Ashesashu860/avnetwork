import React from "react";
import { StyledButton } from "../components";
import GoogleLogo from "../assets/google.png";
import { Grid } from "@material-ui/core";

export const Login = () => {
  React.useEffect(() => window.scrollTo(0, 0));
  return (
    <div className="wrapper center">
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={3}
      >
        <Grid item>
          <img src={GoogleLogo} alt="google logo" style={{ width: "20vmin" }} />
        </Grid>
        <Grid item>
          <StyledButton primary>Login with Google</StyledButton>
        </Grid>
      </Grid>
    </div>
  );
};

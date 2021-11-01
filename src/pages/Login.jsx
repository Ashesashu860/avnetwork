import React from "react";
import { StyledFab } from "../components";
import GoogleLogo from "../assets/google.png";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { loginUserAction } from "../redux/actions";

const mapState = (state) => ({
  currentUser: state.users.currentUser,
});

export const Login = () => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = () => {
    dispatch(loginUserAction(history));
  };

  return currentUser ? (
    <Redirect to="/" />
  ) : (
    <div className="wrapper center">
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={4}
      >
        <Grid item>
          <h1>Login to explore more.</h1>
          <p></p>
        </Grid>
        <Grid item>
          <img src={GoogleLogo} alt="google logo" style={{ width: "20vmin" }} />
        </Grid>
        <Grid item>
          <StyledFab variant="extended" primary onClick={handleLogin}>
            Login with Google
          </StyledFab>
        </Grid>
      </Grid>
    </div>
  );
};

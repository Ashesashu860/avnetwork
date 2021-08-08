import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Checkbox } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import {
  getAllUsersAction,
  toggleBlogWritePermissionAction,
} from "../redux/actions";
import { ContentContainer } from "../components";

const mapState = (state) => ({
  users: state?.users,
  user: state.user,
});

export const Admin = () => {
  const { users, user } = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(
    () => user?.category === "Admin" && dispatch(getAllUsersAction()),
    []
  );

  const onCheckboxChange = (event) => {
    user?.uid && dispatch(toggleBlogWritePermissionAction(event.target.value));
  };

  return user?.category === "Admin" ? (
    <div className="wrapper">
      <ContentContainer subHeading={"Can Write Blogs"} content={""} />
      <Grid
        container
        spacing={1}
        direction="column"
        style={{ padding: "0 2rem" }}
      >
        {users?.map((user) => (
          <Grid item style={{ borderBottom: "1px solid #ddd" }}>
            <span>
              <Checkbox
                style={{
                  color: "var(--primary)",
                }}
                value={user?.uid}
                checked={user.canWriteBlogs}
                onChange={onCheckboxChange}
              />
            </span>
            {user?.email}
          </Grid>
        ))}
      </Grid>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

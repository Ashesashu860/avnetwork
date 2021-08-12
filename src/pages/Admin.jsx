import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Checkbox } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import {
  getAllUsersAction,
  toggleBlogWritePermissionAction,
} from "../redux/actions";
import { ContentContainer } from "../components";

const mapState = (state) => state.users;

export const Admin = () => {
  const { allUsers, currentUser } = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    currentUser?.category === "Admin" && dispatch(getAllUsersAction());
    const abortController = new AbortController();
    return () => {
      abortController.abort();
    };
  }, []);

  const onCheckboxChange = (event) => {
    currentUser?.uid &&
      dispatch(toggleBlogWritePermissionAction(event.target.value));
  };

  return currentUser?.category === "Admin" ? (
    <div className="wrapper">
      <ContentContainer subHeading={"Can Write Blogs"} content={""} />
      <Grid
        container
        spacing={1}
        direction="column"
        style={{ padding: "0 2rem" }}
      >
        {allUsers?.map((user) => (
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

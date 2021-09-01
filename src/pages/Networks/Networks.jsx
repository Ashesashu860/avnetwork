import React, { useEffect } from "react";
import "./networks.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersAction,
  setDialogBoxPropsAction,
} from "../../redux/actions";
import { ShadowContainer, ContentContainer } from "../../components";
import { Chip } from "@material-ui/core";
import { userCategories } from "../masterData";
import { UserCard } from "./UserCard";
import { useHistory } from "react-router-dom";

const mapState = (state) => ({
  allUsers: state.users.allUsers,
  currentUser: state.users.currentUser,
});

export const Networks = () => {
  const { allUsers, currentUser } = useSelector(mapState);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) {
      history.push("/");
      dispatch(
        setDialogBoxPropsAction(
          "Signup or login to to see the networks",
          {
            title: "OK",
            onButtonClick: (event) => {},
          },
          true
        )
      );
    } else {
      !allUsers && dispatch(getAllUsersAction());
    }
  }, []);
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const onCategoryClick = (index) => {
    setSelectedCategory(userCategories[index]);
  };

  const filteredUsers = !selectedCategory
    ? allUsers
    : allUsers?.filter((user) => user?.category === selectedCategory);

  return (
    <>
      {currentUser ? (
        <div className="wrapper">
          <div
            className="network_container center"
            style={{ flexDirection: "column" }}
          >
            <ContentContainer
              heading={"Connect with people"}
              style={{ padding: "1rem" }}
            />
            <ShadowContainer>
              {userCategories.map((category, index) => (
                <Chip
                  key={category}
                  style={
                    category === selectedCategory
                      ? { backgroundColor: "var(--primary)", color: "#fff" }
                      : {
                          backgroundColor: "var(--primaryLight)",
                        }
                  }
                  clickable
                  onClick={() => onCategoryClick(index)}
                  label={category}
                />
              ))}
            </ShadowContainer>
            <div className="center" style={{ flexWrap: "wrap" }}>
              {filteredUsers?.length > 0 ? (
                filteredUsers?.map((user) => (
                  <UserCard
                    user={user}
                    onClick={() => {
                      history.push({
                        pathname: "/view_user",
                        state: user,
                      });
                    }}
                  />
                ))
              ) : (
                <div>No connections</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

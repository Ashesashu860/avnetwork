import React, { useEffect } from "react";
import "./networks.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersAction,
  setDialogBoxPropsAction,
} from "../../redux/actions";
import { ContentContainer, FilterChips } from "../../components";
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

  const filteredUsers = allUsers?.filter(
    (user) => user?.category !== "Guest" && user?.category !== "Manufacturer"
  );

  const filteredUsersWithCategory =
    !selectedCategory || selectedCategory === "All"
      ? filteredUsers
      : filteredUsers?.filter((user) => user?.category === selectedCategory);

  const filteredUserCategories = ["All", ...userCategories]?.filter(
    (category) => category !== "Guest" && category !== "Manufacturer"
  );

  const onCategoryClick = (index) => {
    setSelectedCategory(filteredUserCategories[index]);
  };

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
            <FilterChips
              options={filteredUserCategories}
              selectedOption={selectedCategory}
              onOptionChange={onCategoryClick}
            />
            <div className="center" style={{ flexWrap: "wrap" }}>
              {filteredUsersWithCategory?.length > 0 ? (
                filteredUsersWithCategory?.map((user) => (
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

import React, { useEffect } from "react";
import { LoaderIcon } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllInterestedUsersForProductAction } from "../../redux/actions";
import { InterestedCard } from "./InterestedCard";

const mapState = (state) => ({
  allInterestedUsersLoading: state.marketPlace.allInterestedUsersLoading,
  allInterestedUsers: state.marketPlace.allInterestedUsers,
});

export const InterestedList = ({ productId, interestedUsersLength }) => {
  const { allInterestedUsersLoading, allInterestedUsers } =
    useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(getAllInterestedUsersForProductAction(productId));
    }
    const abortController = new AbortController();
    return () => abortController.abort();
  }, []);

  return (
    <div
      className="center"
      style={{ flexDirection: "column", padding: "1rem" }}
    >
      {allInterestedUsersLoading ? (
        <>
          <h4>Getting All Interested Users...</h4>
          <LoaderIcon />
        </>
      ) : (
        <>
          {allInterestedUsers?.map((user) => (
            <InterestedCard {...user} />
          ))}
        </>
      )}
    </div>
  );
};

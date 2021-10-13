import React, { useEffect, useState } from "react";
import {
  ResponsiveBody,
  UserDialogAvatar,
  StyledFab,
} from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { useParams, useHistory } from "react-router-dom";
import {
  getCurrentMarketPlaceProductAction,
  getCurrentProductOwnerAction,
  setInterestForProductInDbAction,
  setCurrentMarketPlaceProductAction,
  deleteMarketPlaceProductAction,
} from "../../../redux/actions";
import styled from "styled-components";
import { InterestedList } from "..";
import { Checkbox } from "@material-ui/core";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ShareIcon from "@material-ui/icons/Share";

const mapState = (state) => ({
  currentProduct: state.marketPlace.currentProduct,
  currentUser: state.users.currentUser,
  currentProductOwner: state.marketPlace.currentProductOwner,
});

const Item = ({ item }) => {
  const [loading, setLoading] = useState(true);
  const onLoaded = () => setLoading(false);
  return (
    <div className="center" style={{ maxHeight: "100%", maxWidth: "100%" }}>
      {loading && (
        <div className="center" style={{ minHeight: "4rem", minWidth: "4rem" }}>
          LOADING...
        </div>
      )}
      <img
        className="fix_wrapper"
        src={item}
        alt="product_image"
        height="100%"
        width="100%"
        onLoad={onLoaded}
        style={{
          objectFit: "contain",
          border: "1px solid #ddd",
          borderRadius: "0.5rem",
          margin: "1rem 0",
        }}
      />
    </div>
  );
};

const StyledContentContainer = styled.div`
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  padding: 2rem 3rem !important;
  & > *:not(:last-child) {
    margin-bottom: 1rem !important;
  }
  @media screen and (max-width: 768px) {
    padding: 1rem !important;
`;

export const ViewProduct = (props) => {
  const params = useParams();
  const productId = props?.location?.state?.id || params.id;
  const history = useHistory();

  const { currentProduct, currentUser, currentProductOwner } =
    useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getCurrentMarketPlaceProductAction(productId));
    return () => {
      dispatch(setCurrentMarketPlaceProductAction(null));
      const abortController = new AbortController();
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    currentProduct &&
      dispatch(getCurrentProductOwnerAction(currentProduct?.userId));
  }, [currentProduct]);

  const onInterestedClick = (event) => {
    dispatch(
      setInterestForProductInDbAction(
        productId,
        currentUser?.uid,
        event.target.checked
      )
    );
  };
  return (
    <>
      <ResponsiveBody className="wrapper">
        <div>
          <div>
            <Carousel
              fullHeightHover
              indicatorContainerProps={{
                style: {
                  height: "3rem",
                  marginTop: "-3.27rem", // 5
                },
              }}
              navButtonsAlwaysVisible
              navButtonsProps={{
                style: {
                  opacity: 0.4,
                },
              }}
            >
              {currentProduct?.images &&
                Object.values(currentProduct?.images)?.map((item, i) => (
                  <Item key={i} item={item} />
                ))}
            </Carousel>
          </div>
          <div style={{ width: "100%" }}>
            <StyledContentContainer>
              <h1 style={{ fontWeight: "500" }}>{currentProduct?.title}</h1>
              <div
                className="center"
                style={{
                  justifyContent: "space-between",
                  minWidth: "100%",
                  maxWidth: "100%",
                }}
              >
                <p>Brand: {currentProduct?.brand}</p>
                <div
                  style={{
                    maxHeight: "100%",
                    // border: "1px solid #2e7d32",
                    backgroundColor: "#C8E6C9",
                    color: "#4CAF50",
                    // fontWeight: "bold",
                    borderRadius: "12px",
                    padding: "0.5rem 1.5rem",
                  }}
                >
                  In Stock: {currentProduct?.stock || "Unknown"}
                </div>
              </div>
              <div
                className="center"
                style={{ justifyContent: "flex-start", minWidth: "100%" }}
              >
                <p>Sold by:</p>
                {currentProductOwner && (
                  <div style={{ flex: 1 }}>
                    <UserDialogAvatar
                      height="2rem"
                      user={currentProductOwner}
                      name={currentProductOwner?.displayName}
                    />
                  </div>
                )}
              </div>
              <p>Location: {currentProduct?.location}</p>
              <p>Category: {currentProduct?.category}</p>
              {currentProduct?.price ? (
                <h2>₹ {currentProduct?.price}/-</h2>
              ) : (
                <h2>Contact to get a quote.</h2>
              )}
              <div>
                <h3 style={{ marginBottom: "1rem" }}>Description</h3>
                <p>{currentProduct?.description}</p>
              </div>
              {/* Product operations */}
              {currentUser ? (
                currentProduct?.userId !== currentUser?.uid ? (
                  <div
                    className="center"
                    style={{ justifyContent: "flex-start", flexWrap: "nowrap" }}
                  >
                    {/* Interested Button */}
                    <Checkbox
                      onClick={onInterestedClick}
                      checked={
                        !!(
                          currentProduct?.interestedUsers &&
                          Object.keys(currentProduct?.interestedUsers).includes(
                            currentUser?.uid
                          )
                        )
                      }
                      checkedIcon={
                        <StyledFab variant="extended" bold secondary>
                          Not Interested
                        </StyledFab>
                      }
                      icon={
                        <StyledFab variant="extended" bold primary>
                          Interested
                        </StyledFab>
                      }
                      {...props}
                    />
                    {/* Whatsapp link */}
                    <a
                      href={`https://api.whatsapp.com/send?phone=+91${currentProductOwner?.phoneNumber}&text=Hi, I got your number from avnetwork.in. I am interested in your product "${currentProduct?.title}".`}
                      style={{ textDecoration: "none" }}
                    >
                      <StyledFab bold primary round>
                        <WhatsAppIcon />
                      </StyledFab>
                    </a>
                    <StyledFab
                      primary
                      round
                      style={{ marginLeft: "1rem" }}
                      onClick={() =>
                        navigator.share({
                          url: window.location.href,
                        })
                      }
                    >
                      <ShareIcon />
                    </StyledFab>
                  </div>
                ) : (
                  currentProduct?.userId === currentUser?.uid && (
                    <div
                      className="center"
                      style={{
                        justifyContent: "flex-start",
                        flexWrap: "nowrap",
                      }}
                    >
                      <StyledFab
                        bold
                        primary
                        round
                        style={{ marginRight: "1rem" }}
                        onClick={() =>
                          history.push({
                            pathname: "/post_product",
                            state: {
                              currentProduct,
                            },
                          })
                        }
                      >
                        <EditIcon />
                      </StyledFab>

                      <StyledFab
                        bold
                        primary
                        round
                        onClick={() =>
                          dispatch(
                            deleteMarketPlaceProductAction(
                              currentProduct?.id,
                              history
                            )
                          )
                        }
                      >
                        <DeleteIcon />
                      </StyledFab>
                    </div>
                  )
                )
              ) : (
                <h3>Login to show interest to this product</h3>
              )}
            </StyledContentContainer>
          </div>
        </div>
      </ResponsiveBody>
      {currentProduct?.userId === currentUser?.uid && (
        <InterestedList
          productId={productId}
          productTitle={currentProduct?.title}
        />
      )}
    </>
  );
};

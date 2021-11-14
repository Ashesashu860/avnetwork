import React, { useEffect } from "react";
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
import { Checkbox, Avatar } from "@material-ui/core";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ShareIcon from "@material-ui/icons/Share";
import StorefrontIcon from "@material-ui/icons/Storefront";
import { Helmet } from "react-helmet";
import "./view-product.css";

const mapState = (state) => ({
  currentProduct: state.marketPlace.currentProduct,
  currentUser: state.users.currentUser,
  currentProductOwner: state.marketPlace.currentProductOwner,
});

const Item = ({ item }) => {
  return (
    <div className="fix_wrapper center slide_image_container">
      <img
        className="slide_image"
        src={item}
        alt="product_image"
        loading="lazy"
      />
    </div>
  );
};

const StyledContentContainer = styled.div`
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  padding: 0 3rem !important;
  & > *:not(:last-child) {
    margin-bottom: 1rem !important;
  }
  @media screen and (max-width: 768px) {
    padding: 2rem 0.5rem !important;
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
      <Helmet>
        <title>{currentProduct?.title}</title>
        <meta
          name="description"
          content={
            currentProduct?.description ||
            "Explore, Buy or Sell audio/video products like Speakers, Wires, Audio Cables, Microphones(Mic) etc."
          }
        />
        <meta
          name="keywords"
          content="Audio, Video, Sound, Speaker, Microphone, Wires, Cables, Mic, Digital, Armoured Cables, AWG, Analog, Blog, Displays, Lightning, Truss, Trussing Systems, Connectors, Amplifiers, Panels, Market Place, Audiophile, Wire guage"
        />
      </Helmet>
      <ResponsiveBody className="wrapper">
        <div className="responsive_container">
          <div className="responsive_left">
            <Carousel className="view_prod_carousel">
              {currentProduct?.images &&
                Object.values(currentProduct?.images)?.map((item, i) => (
                  <Item key={i} item={item} />
                ))}
            </Carousel>
            {/* <Slider
              images={
                currentProduct?.images && Object.values(currentProduct?.images)
              }
              className="slide_image"
            /> */}
          </div>
          <div style={{ width: "100%" }}>
            <StyledContentContainer>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontWeight: "bold",
                  color: "var(--text-dark)",
                  fontSize: "2rem",
                  textAlign: "left",
                }}
              >
                {currentProduct?.title.toUpperCase()}
              </h2>
              {currentProduct?.price ? (
                <h2>₹ {currentProduct?.price}/-</h2>
              ) : (
                <h2>Contact to get a quote.</h2>
              )}
              <div>
                <h3 style={{ marginBottom: "1rem" }}>Description</h3>
                <p style={{ letterSpacing: "1px" }}>
                  {currentProduct?.description}
                </p>
              </div>
              <div>
                <h3 style={{ marginBottom: "1rem" }}>Brand</h3>
                <p style={{ letterSpacing: "1px" }}>{currentProduct?.brand}</p>
              </div>
              <div className="seller_container">
                <h3 style={{ marginBottom: "1rem" }}>Sold By</h3>

                {currentProductOwner && (
                  <UserDialogAvatar
                    height="2rem"
                    user={currentProductOwner}
                    name={currentProductOwner?.displayName}
                  />
                )}
              </div>
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

              <div>
                <h3 style={{ marginBottom: "1rem" }}>Location</h3>
                <p style={{ letterSpacing: "1px" }}>
                  {currentProduct?.location}
                </p>
              </div>
              <div>
                <h3 style={{ marginBottom: "1rem" }}>Category</h3>
                <p style={{ letterSpacing: "1px" }}>
                  {currentProduct?.category}
                </p>
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

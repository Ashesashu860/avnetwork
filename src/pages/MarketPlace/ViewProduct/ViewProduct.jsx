import React, { useEffect, useState } from "react";
import { MainContainer, LoaderIcon, StyledFab } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom";
import {
  getCurrentMarketPlaceProductAction,
  setInterestForProductInDbAction,
} from "../../../redux/actions";
import styled from "styled-components";
import { InterestedList } from "..";
import { Checkbox } from "@material-ui/core";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

const mapState = (state) => ({
  currentProduct: state.marketPlace.currentProduct,
  currentUser: state.users.currentUser,
});

const Item = ({ item }) => {
  const [loading, setLoading] = useState(true);
  const onLoaded = () => setLoading(false);
  return (
    <div style={{ minHeight: "100%", minWidth: "100%" }}>
      {loading && <LoaderIcon />}
      <img
        className="fix_wrapper"
        src={item}
        alt="product_image"
        height="100%"
        width="100%"
        onLoad={onLoaded}
        style={{
          objectFit: "contain",
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
`;

export const ViewProduct = (props) => {
  const params = useParams();
  const productId = props?.location?.state?.id || params.id;

  const { currentProduct, currentUser } = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getCurrentMarketPlaceProductAction(productId));
    return () => {
      const abortController = new AbortController();
      abortController.abort();
    };
  }, []);

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
      <MainContainer className="wrapper">
        <div style={{ maxWidth: "100%", width: "100%" }}>
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
            autoPlay={false}
          >
            {currentProduct?.images &&
              Object.values(currentProduct?.images)?.map((item, i) => (
                <Item key={i} item={item} />
              ))}
          </Carousel>
        </div>
        <StyledContentContainer>
          <h3>{currentProduct?.title}</h3>
          <div
            className="center"
            style={{
              justifyContent: "space-between",
              minWidth: "100%",
              maxWidth: "100%",
            }}
          >
            <p>{currentProduct?.brand}</p>
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
              In Stock: {currentProduct?.stock}
            </div>
          </div>
          <p>Sold by: {currentProduct?.sellarName}</p>
          <p>Location: {currentProduct?.location}</p>
          <h2>Rs. {currentProduct?.price}/-</h2>
          <div>
            <h3 style={{ marginBottom: "1rem" }}>Description</h3>
            <p>{currentProduct?.description}</p>
          </div>
          {currentUser ? (
            currentProduct?.userId !== currentUser?.uid && (
              <div
                className="center"
                style={{ justifyContent: "flex-start", flexWrap: "nowrap" }}
              >
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
                <a
                  href={`https://api.whatsapp.com/send?phone=+91${currentUser?.phoneNumber}&text=Hi, I got your number from avnetwork.in. I am interested in your product "${currentProduct?.title}".`}
                  style={{ textDecoration: "none" }}
                >
                  <StyledFab bold primary round>
                    <WhatsAppIcon />
                  </StyledFab>
                </a>
              </div>
            )
          ) : (
            <h3>Login to show interest to this product</h3>
          )}
        </StyledContentContainer>
      </MainContainer>
      {currentProduct?.userId === currentUser?.uid && (
        <InterestedList
          productId={productId}
          productTitle={currentProduct?.title}
        />
      )}
    </>
  );
};

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

  // <div
  //   style={{
  //     backgroundImage: `url(${item})`,
  //     maxWidth: "100%",
  //     maxHeight: "100%",
  //     backgroundSize: "contain",
  //     backgroundPosition: "center center",
  //   }}
  // ></div>
};

const StyledContentContainer = styled.div`
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  padding: 2rem !important;
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
          <p>{currentProduct?.brand}</p>
          <h2>Rs. {currentProduct?.price}/-</h2>
          <div>
            <h3>Description</h3>
            <p>{currentProduct?.description}</p>
          </div>
          <div
            style={{
              height: "2.5rem",
              display: "flex",
              marginTop: "1rem",
              marginLeft: "-1rem",
            }}
          >
            {currentUser ? (
              <Checkbox
                // disableRipple
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
            ) : (
              <h3>Login to show interest to this product</h3>
            )}
          </div>
        </StyledContentContainer>
      </MainContainer>
      {currentProduct?.userId === currentUser?.uid && (
        <InterestedList productId={productId} />
      )}
    </>
  );
};

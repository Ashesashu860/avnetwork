import React from "react";
import styled from "styled-components";
import { Card } from "@material-ui/core";

const ProductCardContainer = styled(Card)`
  width: 14rem;
  justify-content: flex-start !important;
  flex-direction: column;
  margin: 1rem 0.5rem;
  // border-radius: 0.8rem !important;
  overflow: hidden;
  &:hover {
    box-shadow: 1px 3px 6px 1px rgb(0, 0, 0, 14%) !important;
  }
  @media screen and (max-width: 450px) {
    width: 46%;
  }
  @media screen and (max-width: 300px) {
    width: 80%;
  }
  box-shadow: 0;
`;

const ProductHeading = styled.div`
  color: #999;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 1.1rem;
  display: -webkit-box;
  color: #000;
`;

const ImageContainer = styled.div`
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background: ${(props) => `url(${props.image})`};
  width: 100%;
  height: 14rem;
  background-color: rgb(247, 247, 247);
  background-position: center center;
  border-bottom: 1px solid #ddd;
`;

const ProductContentContainer = styled.div`
  padding: 0.5rem 1rem;
  width: 100%;
  font-size: 0.8rem;
  & > *:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const PorductSubContainer = styled.div`
  & > *:not(:last-child) {
    margin-bottom: 0.2rem;
  }
`;

const Button = styled.div`
  background-color: var(--primary);
  color: #fff;
  width: 100%;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 0.6rem;
  text-align: center;
`;

const StyledText = styled.p`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.8rem;
  color: #00000099;
`;

export const ProductCard = ({
  images,
  price,
  title,
  brand,
  onClick,
  sellarName,
  category,
  stock,
}) => {
  return (
    <ProductCardContainer className="center" onClick={onClick}>
      <ImageContainer
        image={images && Object.values(images)[0]}
      ></ImageContainer>
      <ProductContentContainer>
        <ProductHeading>{title}</ProductHeading>
        <PorductSubContainer>
          <StyledText>{category || "Category not specified"}</StyledText>
          <StyledText>Brand: {brand || "Brand not specified"}</StyledText>
          <StyledText>
            Sold By: {sellarName || "Seller not specified"}
          </StyledText>
        </PorductSubContainer>
        {/* <div
          className="center"
          style={{ justifyContent: "space-between", padding: "0.5rem 0" }}
        >
          <h3 style={{ fontSize: "1rem" }}>₹{price}/-</h3>
          <div
            style={{
              backgroundColor: "#C8E6C9",
              color: "#4CAF50",
              borderRadius: "0.5rem",
              padding: "0.5rem 1rem",
              maxWidth: "fit-content",
              fontSize: "0.65rem",
            }}
          >
            In Stock: {stock || 0}
          </div>
        </div> */}
        <div
          style={{
            backgroundColor: "#C8E6C9",
            color: "#4CAF50",
            borderRadius: "0.5rem",
            padding: "0.5rem 1rem",
            maxWidth: "fit-content",
            fontSize: "0.7rem",
          }}
        >
          In Stock: {stock || "Unknown"}
        </div>
        <h3 style={{ fontSize: "1rem" }}>
          {price ? `₹${price}/-` : "Get a quote"}
        </h3>
      </ProductContentContainer>
      <Button>CHECKOUT</Button>
    </ProductCardContainer>
  );
};

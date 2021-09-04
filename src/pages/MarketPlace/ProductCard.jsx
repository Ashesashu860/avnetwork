import React from "react";
import styled from "styled-components";
import { Card } from "@material-ui/core";

const ProductCardContainer = styled(Card)`
  width: 18rem;
  justify-content: flex-start !important;
  flex-direction: column;
  margin: 1rem 0.5rem;
  border-radius: 0.8rem !important;
  // border: 1px solid #ddd;
  overflow: hidden;
  &:hover {
    box-shadow: 1px 3px 6px 1px rgb(0, 0, 0, 14%) !important;
  }
`;

// const Image = styled.img`
//   max-width: 100%;
//   box-shadow: 1px 3px 6px 1px rgb(0, 0, 0, 4%) !important;
// `;

const ImageContainer = styled.div`
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background: ${(props) => `url(${props.image})`};
  width: 100%;
  border-radius: 0.8rem !important;
  height: 16rem;
  background-color: rgb(247, 247, 247);
  background-position: center center;
  border-bottom: 1px solid #ddd;
`;

const ProductContentContainer = styled.div`
  padding: 1rem;
  width: 100%;
  & > *:not(:last-child) {
    margin-bottom: 0.7rem;
  }
`;

const Button = styled.div`
  background-color: var(--primary);
  color: #fff;
  width: 100%;
  border-bottom-left-radius: 0.8rem;
  border-bottom-right-radius: 0.8rem;
  padding: 1rem;
  text-align: center;
`;

export const ProductCard = ({
  images,
  price,
  title,
  brand,
  onClick,
  sellarName,
  stock,
}) => {
  return (
    <ProductCardContainer className="center" onClick={onClick}>
      {/* <Image src={Object.values(images)[0]} alt="sadas" /> */}
      <ImageContainer
        image={images && Object.values(images)[0]}
      ></ImageContainer>
      <ProductContentContainer>
        <h3
          style={{
            width: "100%",
            fontSize: "1.2rem",
            fontWeight: "500",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </h3>

        <div className="center" style={{ justifyContent: "space-between" }}>
          <span
            style={{
              width: "fit-content",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "0.9rem",
              color: "var(--text-medium)",
              fontWeight: "normal",
            }}
          >
            Brand: {brand}
          </span>
          <div
            style={{
              // border: "1px solid #2e7d32",
              backgroundColor: "#C8E6C9",
              color: "#4CAF50",
              // fontWeight: "bold",
              borderRadius: "0.5rem",
              padding: "0.5rem 1rem",
              maxWidth: "fit-content",
              fontSize: "0.8rem",
            }}
          >
            In Stock: {stock}
          </div>
        </div>
        <h5
          style={{
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: "0.9rem",
            color: "var(--text-medium)",
            fontWeight: "normal",
          }}
        >
          Sold By: {sellarName}
        </h5>
        <h3>Rs.{price}/-</h3>
      </ProductContentContainer>
      <Button>CHECKOUT</Button>
    </ProductCardContainer>
  );
};

import React from "react";
import styled from "styled-components";
import { Card } from "@material-ui/core";

const ProductCardContainer = styled(Card)`
  width: 18rem;
  justify-content: flex-start !important;
  flex-direction: column;
  margin: 1rem 0.5rem;
  // border-radius: 4px;
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
  height: 16rem;
  background-color: rgb(247, 247, 247);
  background-position: center center;
  border-bottom: 1px solid #ddd;
`;

const ProductContentContainer = styled.div`
  padding: 1rem;
  width: 100%;
  & > *:not(:last-child) {
    margin-bottom: 0.3rem;
  }
`;

export const ProductCard = ({ images, price, title, brand, onClick }) => {
  return (
    <ProductCardContainer className="center" onClick={onClick}>
      {/* <Image src={Object.values(images)[0]} alt="sadas" /> */}
      <ImageContainer image={Object.values(images)[0]}></ImageContainer>
      <ProductContentContainer>
        <h3
          style={{
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: "1.2rem",
            fontWeight: "500",
          }}
        >
          {title}
        </h3>
        <h5
          style={{
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: "0.8rem",
            color: "var(--text-medium)",
            fontWeight: "normal",
          }}
        >
          {brand}
        </h5>
        <h3>Rs.{price}/-</h3>
      </ProductContentContainer>
    </ProductCardContainer>
  );
};

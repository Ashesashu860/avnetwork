import React, { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { useHistory } from "react-router-dom";
import { FilterChips, ShadowContainer } from "../../components";
import {
  marketPlaceProductCategories,
  marketPlaceProductAds,
} from "../masterData";
import { useDispatch, useSelector } from "react-redux";
import { getAllMarketPlaceProducts } from "../../redux/actions";
import styled from "styled-components";
import BackgroundImage from "../../assets/bg.svg";

const StyledContainer = styled.div`
  flex-wrap: wrap;
  max-width: 100%;
  background-color: var(--background);
  background-image: url(${BackgroundImage});
  background-repeat: no-repeat;
  background-position: top right;
`;

const mapState = (state) => ({
  allProducts: state.marketPlace.allProducts,
});

export const ProductsList = ({ direction, userId, latest, showAds }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { allProducts } = useSelector(mapState);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const filteredCategories = [...marketPlaceProductCategories];
  filteredCategories?.shift();
  filteredCategories?.unshift("All");

  const onCategoryClick = (index) => {
    setSelectedCategory(filteredCategories[index]);
    setFilteredProducts(
      filteredCategories[index] === "All"
        ? allProducts
        : allProducts?.filter(
            (product) => product.category === filteredCategories[index]
          )
    );
  };

  useEffect(() => {
    const userFilteredProducts = userId
      ? allProducts?.filter((product) => product.userId === userId)
      : allProducts;
    const latestFilteredProducts = latest
      ? userFilteredProducts?.slice(-3)
      : userFilteredProducts;
    if (showAds) {
      const count = latestFilteredProducts?.length;
      const firstPosition = Math.floor(
        count / (marketPlaceProductAds?.length + 1)
      );
      for (let count = 1; count <= marketPlaceProductAds?.length; count++) {
        latestFilteredProducts?.splice(
          firstPosition * count,
          0,
          marketPlaceProductAds[count - 1]
        );
      }
    }
    setFilteredProducts(latestFilteredProducts);
  }, [allProducts]);

  useEffect(() => {
    dispatch(getAllMarketPlaceProducts());
  }, []);

  return (
    <StyledContainer className="center">
      <FilterChips
        options={filteredCategories}
        selectedOption={selectedCategory}
        onOptionChange={onCategoryClick}
        style={{ marginTop: "1rem", maxWidth: "100%" }}
      />
      <ShadowContainer>
        <div
          className="center"
          style={{
            display: "inline-flex",
            flexWrap: direction === "row" ? "nowrap" : "wrap",
          }}
        >
          {filteredProducts && filteredProducts?.length !== 0 ? (
            filteredProducts?.map((product, index) =>
              typeof product === "string" ? (
                <div style={{ height: "16rem", width: "16rem" }}>
                  <img
                    alt="ad"
                    src={product}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </div>
              ) : (
                <ProductCard
                  key={index}
                  {...product}
                  onClick={() =>
                    history.push({
                      pathname: `/products/${product.id}`,
                      state: {
                        id: product.id,
                      },
                    })
                  }
                />
              )
            )
          ) : (
            <h3 style={{ padding: "1rem" }}>No Products</h3>
          )}
        </div>
      </ShadowContainer>
    </StyledContainer>
  );
};

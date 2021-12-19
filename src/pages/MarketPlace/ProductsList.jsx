import React, { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { useHistory } from "react-router-dom";
import { AdsContainer, FilterChips, ShadowContainer } from "../../components";
import {
  marketPlaceProductCategories,
  marketPlaceProductAds,
} from "../masterData";
import { useDispatch, useSelector } from "react-redux";
import { getAllMarketPlaceProducts } from "../../redux/actions";
import styled from "styled-components";
import BackgroundImage from "../../assets/bg.svg";
import { Grid } from "@material-ui/core";

const StyledContainer = styled.div`
  flex-wrap: wrap;
  max-width: 100%;
  background-color: var(--background);
  background-image: url(${BackgroundImage});
  background-repeat: no-repeat;
  background-position: top right;
`;

const Ad = styled.div`
  height: 16rem;
  width: 16rem;
  display: none;
  @media screen and (max-width: 768px) {
    display: initial;
  }
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
  const [categorisedProducts, setcategorisedProducts] = useState([]);

  const filteredCategories = [...marketPlaceProductCategories];
  filteredCategories?.shift();
  filteredCategories?.unshift("All");

  const onCategoryClick = (index) => {
    setSelectedCategory(filteredCategories[index]);
    setcategorisedProducts(
      filteredCategories[index] === "All"
        ? filteredProducts
        : filteredProducts?.filter(
            (product) => product.category === filteredCategories[index]
          )
    );
  };

  useEffect(() => {
    const userFilteredProducts = userId
      ? allProducts?.filter((product) => product.userId === userId)
      : allProducts;
    const sortedFilteredProducts = userFilteredProducts?.sort(
      (one, next) => new Date(next?.timestamp) - new Date(one?.timestamp)
    );
    const latestFilteredProducts = latest
      ? sortedFilteredProducts?.slice(0, 5)
      : sortedFilteredProducts;
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
    setcategorisedProducts(latestFilteredProducts);
  }, [allProducts]);

  useEffect(() => {
    dispatch(getAllMarketPlaceProducts());
  }, []);
  return (
    <StyledContainer className="center">
      <AdsContainer>
        <div style={{ ...(!showAds && { width: "100%" }) }}>
          <FilterChips
            options={filteredCategories}
            selectedOption={selectedCategory}
            onOptionChange={onCategoryClick}
            style={{ marginTop: "1rem", maxWidth: "100%" }}
          />
          <ShadowContainer>
            <div
              style={{
                display: "inline-flex",
                flexWrap: direction === "row" ? "nowrap" : "wrap",
                // justifyContent: latest ? "space-evenly" : "initial",
                width: "100%",
                minWidth: "100%",
              }}
            >
              {categorisedProducts && categorisedProducts?.length !== 0 ? (
                categorisedProducts?.map((product, index) =>
                  typeof product === "string" ? (
                    <Ad>
                      <img
                        alt="ad"
                        src={product}
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    </Ad>
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
        </div>
        {showAds && (
          <Grid contianer spacing={3}>
            {marketPlaceProductAds.map((ad) => (
              <Grid item style={{ width: "100%" }}>
                <img alt="ad" src={ad} style={{ width: "100%" }} />
              </Grid>
            ))}
          </Grid>
        )}
      </AdsContainer>
    </StyledContainer>
  );
};

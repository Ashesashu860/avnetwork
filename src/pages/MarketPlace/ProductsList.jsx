import React, { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { useHistory } from "react-router-dom";
import { FilterChips, ShadowContainer } from "../../components";
import { marketPlaceProductCategories } from "../masterData";
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

export const ProductsList = ({ direction, userId, latest }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { allProducts } = useSelector(mapState);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // const [filteredProducts, setFilteredProducts] = useState();
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
    const userFilter = userId
      ? allProducts?.filter((product) => product.userId === userId)
      : allProducts;
    const latestFilter = latest ? userFilter?.slice(-3) : userFilter;
    setFilteredProducts(latestFilter);
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
            filteredProducts?.map((product, index) => (
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
            ))
          ) : (
            <h3 style={{ padding: "1rem" }}>No Products</h3>
          )}
        </div>
      </ShadowContainer>
    </StyledContainer>
  );
};

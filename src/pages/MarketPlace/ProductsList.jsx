import React, { useState } from "react";
import { ProductCard } from "./ProductCard";
import { useHistory } from "react-router-dom";
import { FilterChips } from "../../components";
import { marketPlaceProductCategories } from "../masterData";

export const ProductsList = ({ products }) => {
  const history = useHistory();
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const filteredCategories = [...marketPlaceProductCategories];
  filteredCategories.shift();
  filteredCategories.unshift("All");
  const onCategoryClick = (index) => {
    setSelectedCategory(filteredCategories[index]);
    setFilteredProducts(
      filteredCategories[index] === "All"
        ? products
        : products.filter(
            (product) => product.category === filteredCategories[index]
          )
    );
  };
  return (
    <div
      className="center"
      style={{
        flexWrap: "wrap",
        backgroundColor: "#eee",
        maxWidth: "100%",
      }}
    >
      <FilterChips
        options={filteredCategories}
        selectedOption={selectedCategory}
        onOptionChange={onCategoryClick}
        style={{ marginTop: "1rem", maxWidth: "100%" }}
      />
      {filteredProducts?.length !== 0 ? (
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
  );
};

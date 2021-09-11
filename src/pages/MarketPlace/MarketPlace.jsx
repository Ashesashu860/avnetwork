import React from "react";
import {
  ContentContainer,
  StyledFab,
  MainContainer,
  StyledNavLink,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllMarketPlaceProducts } from "../../redux/actions";
import { ProductCard } from "./ProductCard";
import { useHistory } from "react-router-dom";
import MarketPlaceSvg from "../../assets/market_place/market_place_home.png";

const mapState = (state) => ({
  allProducts: state.marketPlace.allProducts,
  currentUser: state.users.currentUser,
});

export const MarketPlace = () => {
  const { allProducts, currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    !allProducts && dispatch(getAllMarketPlaceProducts());
  }, []);

  return (
    <>
      <MainContainer className="fix_wrapper">
        <div className="blog-containers">
          <img src={MarketPlaceSvg} alt="Market Place" />
        </div>
        <ContentContainer
          heading={"Market Place"}
          content={
            "Buy or sell variety of audio products at your platform. This is a one-stop shop for all your needs."
          }
          spacing="2.5rem"
          className="blog_landing_content"
        >
          {currentUser && (
            <div
              style={{
                height: "2.5rem",
                display: "flex",
                marginBottom: "2rem",
              }}
            >
              <StyledNavLink to="/post_product">
                <StyledFab variant="extended" bold primary>
                  Post your Product
                </StyledFab>
              </StyledNavLink>
            </div>
          )}
        </ContentContainer>
      </MainContainer>
      <ContentContainer
        subHeading={"All Products"}
        content={"View our variety of different products"}
      />
      <div
        className="center"
        style={{ flexWrap: "wrap", backgroundColor: "#eee" }}
      >
        {allProducts?.map((product, index) => (
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
        ))}
      </div>
    </>
  );
};

import React from "react";
import {
  ContentContainer,
  StyledFab,
  StyledNavLink,
  ResponsiveBody,
} from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllMarketPlaceProducts } from "../../../redux/actions";
import { useHistory } from "react-router-dom";
import MarketPlaceHomeImg from "../../../assets/market_place/market_place_home.png";
import "./market_place_home.css";
import { ProductsList } from "../ProductsList";

const mapState = (state) => ({
  // allProducts: state.marketPlace.allProducts,
  currentUser: state.users.currentUser,
});

export const MarketPlaceHome = () => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    // dispatch(getAllMarketPlaceProducts());
  }, []);

  return (
    <>
      <ResponsiveBody className="wrapper fix_wrapper">
        <h1>WELCOME TO AVNETWORK MARKETPLACE</h1>
        <div>
          <div className="market_place_home_left">
            <img
              className="market_place_home_logo"
              src={MarketPlaceHomeImg}
              alt="Market Place Logo"
            />
          </div>
          <div className="center market_place_home_right">
            <h1 style={{ color: "var(--primary)", textAlign: "center" }}>
              BUY OR SELL
            </h1>
            <h1 style={{ color: "#000", textAlign: "center" }}>
              {"PRODUCTS & SERVICES"}
            </h1>
            {currentUser && (
              <StyledNavLink to="/post_product">
                <StyledFab variant="extended" bold primary>
                  Post your Product
                </StyledFab>
              </StyledNavLink>
            )}
          </div>
        </div>
      </ResponsiveBody>
      <ContentContainer
        subHeading={"All Products"}
        content={"View our variety of different products"}
      />
      <ProductsList />
    </>
  );
};

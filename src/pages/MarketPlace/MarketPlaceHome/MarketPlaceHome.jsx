import React from "react";
import "./market_place_home.css";
import MarketPlaceHomeImg from "../../../assets/market_place/market_place_home.png";
import { StyledNavLink, StyledFab } from "../../../components";

export const MarketPlaceHome = () => {
  return (
    <div className="market_place_container wrapper fix_wrapper">
      <div style={{ width: "100%" }}>
        <h2 className="market_place_heading">
          WELCOME TO AVNETWORK MARKETPLACE
        </h2>
      </div>
      <div>
        <img
          className="market_place_logo"
          src={MarketPlaceHomeImg}
          alt="Market Place Logo"
        />
      </div>
      <div
        className="center"
        style={{ flexDirection: "column", width: "100%" }}
      >
        <h1 style={{ color: "var(--primary)", textAlign: "center" }}>
          BUY OR SELL
        </h1>
        <h1 style={{ color: "#000", textAlign: "center" }}>
          {"PRODUCTS & SERVICES"}
        </h1>
        <StyledNavLink to="/post_product">
          <StyledFab variant="extended" bold primary>
            Post your Product
          </StyledFab>
        </StyledNavLink>
      </div>
    </div>
  );
};

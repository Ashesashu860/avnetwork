import React from "react";
import {
  ContentContainer,
  StyledFab,
  StyledNavLink,
  ResponsiveBody,
} from "../../../components";
import { useSelector } from "react-redux";
import MarketPlaceHomeImg from "../../../assets/market_place/market_place_home.png";
import "./market_place_home.css";
import { ProductsList } from "../ProductsList";
import { Helmet } from "react-helmet";

const mapState = (state) => ({
  currentUser: state.users.currentUser,
});

export const MarketPlaceHome = () => {
  const { currentUser } = useSelector(mapState);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Market place</title>
        <meta
          name="description"
          content="Explore, Buy or Sell audio/video products like Speakers, Wires, Audio Cables, Microphones(Mic) etc."
        />
        <meta
          name="keywords"
          content="Audio, Video, Sound, Speaker, Microphone, Wires, Cables, Mic, Digital, Armoured Cables, AWG, Analog, Blog, Displays, Lightning, Truss, Trussing Systems, Connectors, Amplifiers, Panels, Market Place, Audiophile, Wire guage"
        />
      </Helmet>
      <ResponsiveBody className="wrapper fix_wrapper">
        <h1>WELCOME TO AVNETWORK MARKETPLACE</h1>
        <div>
          <div className="center">
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
      <ProductsList showAds />
    </>
  );
};

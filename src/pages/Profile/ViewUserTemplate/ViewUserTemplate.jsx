import React, { useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import BusinessIcon from "@material-ui/icons/Business";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Carousel from "react-material-ui-carousel";
import "./view_user_template.css";
import { ContentContainer } from "../../../components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ProductCard } from "../../MarketPlace/ProductCard";
import { getAllMarketPlaceProducts } from "../../../redux/actions";

const mapState = (state) => ({
  allProducts: state.marketPlace.allProducts,
});

const DetailItem = ({ icon, title, value }) => (
  <div className="center" style={{ justifyContent: "flex-start" }}>
    <IconButton
      disableRipple
      style={{ backgroundColor: "#ccc", marginRight: "1rem" }}
    >
      {icon}
    </IconButton>
    <div
      className="center"
      style={{ flexDirection: "column", alignItems: "flex-start" }}
    >
      <span style={{ fontWeight: "bold", marginBottom: "0.2rem" }}>
        {title}
      </span>
      <span>{value || `${title} not found`}</span>
    </div>
  </div>
);

const Item = ({ item, height, width }) => {
  const [loading, setLoading] = useState(true);
  const onLoaded = () => setLoading(false);
  return (
    <div className="center">
      {loading && <div style={{ height: "100%" }}>Loading...</div>}
      <img
        className="fix_wrapper"
        src={item}
        alt="product_image"
        onLoad={onLoaded}
        style={{
          objectFit: "contain",
          height,
          width,
        }}
      />
    </div>
  );
};

export const ViewUserTemplate = ({ user }) => {
  const details = [
    {
      icon: <EmailIcon />,
      title: "Email ID",
      value: user?.email,
    },
    {
      icon: <PhoneIcon />,
      title: "Phone Number",
      value: user?.phoneNumber,
    },
    {
      icon: <BusinessIcon />,
      title: "Address",
      value: user?.address,
    },
    {
      icon: <LocationOnIcon />,
      title: "Service Locations",
      value: user?.serviceLocations,
    },
  ];

  const history = useHistory();
  const { allProducts } = useSelector(mapState);
  const filteredProducts = allProducts?.filter(
    (product) => product.userId === user.uid
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    !allProducts && dispatch(getAllMarketPlaceProducts());
  }, []);

  return (
    <>
      <div className="center view_user_header">
        <Avatar style={{ height: "6.5rem", width: "6.5rem" }}>
          <img
            src={user?.photoURL}
            alt={user?.displayName?.charAt(0)}
            style={{ maxHeight: "100%" }}
          />
        </Avatar>
        <div>
          <h1>{user?.displayName}</h1>
          <p style={{ fontSize: "1.2rem", marginTop: "0.5rem" }}>
            {user?.category}
          </p>
        </div>
      </div>
      <div className="center profile_content">
        <div className="profile_list_contianer">
          {details.map((detail) => (
            <DetailItem
              icon={detail?.icon}
              value={detail?.value}
              title={detail?.title}
            />
          ))}
        </div>
        <div
          className="center user_work_images_container"
          style={{ flexDirection: "column" }}
        >
          <h2 style={{ padding: "1rem" }}>Images of our work</h2>
          {user?.userWorkImages ? (
            <Carousel
              fullHeightHover
              indicatorContainerProps={{
                style: {
                  height: "3rem",
                  marginTop: "-3.27rem", // 5
                },
              }}
              navButtonsAlwaysVisible
              navButtonsProps={{
                style: {
                  opacity: 0.4,
                },
              }}
              autoPlay={false}
            >
              {user?.userWorkImages &&
                Object.values(user?.userWorkImages)?.map((item, i) => (
                  <Item key={i} item={item} height={"16rem"} />
                ))}
            </Carousel>
          ) : (
            <h3>No Images Uploaded</h3>
          )}
        </div>
      </div>
      <ContentContainer subHeading={"Our Products"} />
      <div
        className="center"
        style={{ flexWrap: "wrap", backgroundColor: "#eee" }}
      >
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
          <h2 style={{ padding: "1rem" }}>No Products</h2>
        )}
      </div>
    </>
  );
};

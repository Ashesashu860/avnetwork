import React from "react";
import Carousel from "react-material-ui-carousel";
import Audio1 from "../../assets/homepage/audio1.jpg";
import Audio2 from "../../assets/homepage/audio2.jpg";
import Audio3 from "../../assets/homepage/audio3.jpg";
import Audio4 from "../../assets/homepage/audio4.jpg";
import "./homepage.css";
import { StyledNavLink, StyledFab } from "../../components";

export const Homepage = (props) => {
  const sliderData = [
    {
      image: Audio1,
      title: "Express Yourself",
      description:
        "Write blogs about your experiences, your knowledge or about your walkthrough in your journey",
      buttonProps: {
        link: "/blogs",
        title: "Visit Blogs",
      },
    },
    {
      image: Audio2,
      title: "One-Stop Shop",
      description:
        "Be a seller or a buyer in our market place with variety of audio products, all in one platform.",
      buttonProps: {
        link: "/market_place",
        title: "Visit Market Place",
      },
    },
    {
      image: Audio3,
      title: "Find A Career",
      description: "Find suitable career options for you in our job portal.",
      buttonProps: {
        link: "/job_portal",
        title: "Visit Job Portal",
      },
    },
    {
      image: Audio4,
      title: "Upgrade Yourself",
      description:
        "Learn continuously and gather knowledge with our learning platform where experienced people can guide through various technical details.",
      buttonProps: {
        link: "/tutorials",
        title: "Visit Tutorials",
      },
    },
  ];

  return (
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
    >
      {sliderData.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

const Item = ({ item }) => {
  const { image, title, description, buttonProps } = item;
  return (
    <div
      image={image}
      className="wrapper fix_wrapper slide"
      style={{ position: "relative", backgroundImage: `url(${image})` }}
    >
      <div className="center slide_content">
        <h1>{title}</h1>
        <p style={{ textAlign: "center" }}>{description}</p>
        <StyledNavLink
          to={buttonProps.link}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StyledFab variant="extended" bold style={{ height: "3rem" }} primary>
            {buttonProps.title}
          </StyledFab>
        </StyledNavLink>
      </div>
    </div>
  );
};

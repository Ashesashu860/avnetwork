import React from "react";
import { ResponsiveBody } from "../../components";
import styled from "styled-components";
import Image1 from "../../assets/blogs/image1.png";
import Image2 from "../../assets/blogs/image2.png";
import Image3 from "../../assets/blogs/image3.png";
import Image4 from "../../assets/blogs/image4.png";
import Image5 from "../../assets/blogs/image5.png";
import { Grid } from "@material-ui/core";

const SubHeading = styled.div`
  border: 1px solid var(--background);
  border-radius: 2.5rem;
  background-color: var(--primaryMedium);
  color: #000;
  padding: 1rem 2rem;
  font-weight: bold;
  font-size: 2rem;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Image = styled.img`
  max-height: 16rem;
  max-width: 16rem;

  @media screen and (max-width: 768px) {
    max-height: 8rem;
    max-width: 8rem;
  }
`;

const SubContent = styled.div`
  & > *:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

export const BlogHome = () => {
  const images = [
    { image: Image1, text: "AV Cables" },
    { image: Image2, text: "Pro Speakers" },
    { image: Image3, text: "Led Displays" },
    { image: Image4, text: "Lightning Equipments" },
    { image: Image5, text: "Trussing Systems" },
  ];

  return (
    <ResponsiveBody className="wrapper fix_wrapper" column>
      <h1>WELCOME TO AVNETWORK BLOGS</h1>
      <SubContent>
        <p
          style={{
            fontWeight: "bold",
            letterSpacing: "0.1rem",
            color: "#000",
          }}
        >
          Live as if you were to die tomorrow. Learn as if you were to live
          forever - Mahatma Gandhi
        </p>
        <SubHeading>LEARN NOW ABOUT</SubHeading>
        <Grid container spacing={3} alignItems="center" justify="center">
          {images.map((image) => (
            <Grid
              item
              container
              alignItems="center"
              justify="center"
              direction="column"
              style={{ width: "auto" }}
            >
              <Image src={image.image} alt="blog images" />
              <p
                style={{
                  color: "var(--primary)",
                  fontWeight: "bold",
                  marginTop: "0.5rem",
                }}
              >
                {image.text}
              </p>
            </Grid>
          ))}
        </Grid>
      </SubContent>
    </ResponsiveBody>
  );
};

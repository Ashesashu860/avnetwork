import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SliderContainer = styled.div`
  max-height: 100%;
  max-width: 100%;
  height: 100%;
  width: 100%;
`;

export const Slider = ({ images, className, style }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images?.length) {
      const inc = setInterval(() => {
        setCurrentIndex((currentIndex) =>
          currentIndex === images.length - 1 ? 0 : currentIndex + 1
        );
      }, 2000);
      return () => {
        clearInterval(inc);
      };
    }
  }, []);

  console.log("images", currentIndex);
  return (
    <SliderContainer>
      {images?.length && (
        <img
          src={images?.[currentIndex]}
          alt={images?.[currentIndex]?.title}
          className={className}
          style={style}
          loading="lazy"
        />
      )}
    </SliderContainer>
  );
};

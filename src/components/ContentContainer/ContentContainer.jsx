import React from "react";
import styled from "styled-components";
import "./content-container.css";

const StyledDiv = styled.div`
  & > *:not(:last-child) {
    padding-bottom: ${(props) => props.spacing || "0.5rem"};
  }
`;

export const ContentContainer = ({
  heading,
  subHeading,
  content,
  className,
  style,
  children,
  spacing,
}) => {
  return (
    <StyledDiv
      className={`content-container ${className}`}
      style={style}
      spacing={spacing}
    >
      {heading && <h1>{heading}</h1>}
      {subHeading && <h2>{subHeading}</h2>}
      {content && <p>{content}</p>}
      {children}
    </StyledDiv>
  );
};

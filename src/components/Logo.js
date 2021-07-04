import React from "react";
import styled from "styled-components";

const StyledLogo = styled.div`
  font-size: 1rem !important;

  & > span {
    font-weight: bold;
  }

  & > span:first-child {
    color: ${(props) => props.primaryColor || "var(--primary)"};
  }

  & > span:last-child {
    color: ${(props) => props.secondaryColor || "#000"};
  }
`;

export const Logo = (props) => {
  return (
    <StyledLogo {...props}>
      <span>AV</span>
      <span>network</span>
    </StyledLogo>
  );
};

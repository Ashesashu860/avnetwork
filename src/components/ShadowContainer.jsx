import styled from "styled-components";
import React from "react";
import { Grid } from "@material-ui/core";
export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  &::before {
    position: absolute;
    content: "";
    left: -1px;
    width: 1rem;
    z-index: 1;
    background-image: linear-gradient(to right, var(--background), transparent);
    //background-color: red;
    height: 100%;
    top: 0;
  }
  &::after {
    position: absolute;
    top: 0;
    content: "";
    width: 1rem;
    right: -1px;
    background-image: linear-gradient(to left, var(--background), transparent);
    //background-color: red;
    height: 100%;
  }
`;

const SubContainer = styled(Grid)`
  width: 100%;
  height: 100%;
  padding: 0 0.8rem;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  & > *:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export const ShadowContainer = ({ children }) => {
  return (
    <Container>
      <SubContainer
        container
        wrap="nowrap"
        alignItems="center"
        justify="center"
      >
        {children}
      </SubContainer>
    </Container>
  );
};

import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";

const OverflowCircle = styled.div`
  position: relative;
  background-color: var(--primary);
  top: -50%;
  left: -50%;
  transform: translate(50%, 50%);
  transform-origin: center;
  width: 100%;
  height: 20rem;
`;

const StyledAvatar = styled(Avatar)`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 5rem !important;
  height: 5rem !important;
  font-size: 3rem !important;
`;

export const DrawerLayout = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <OverflowCircle>
        <StyledAvatar>A</StyledAvatar>
      </OverflowCircle>
    </div>
  );
};

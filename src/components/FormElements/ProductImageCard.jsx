import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const StyledProductCard = styled(Avatar)`
  height: 7rem !important;
  width: 7rem !important;
  position: relative !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
`;

const StyledDeleteButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  background-color: #00000088;
  padding: 0.2rem;
`;

export const ProductImageCard = ({ selectedImage, onDeleteImage }) => (
  <StyledProductCard
    variant="rounded"
    style={{
      backgroundImage: `url(${URL.createObjectURL(selectedImage)})`,
    }}
  >
    <StyledDeleteButton className="center" onClick={onDeleteImage}>
      <CloseIcon />
    </StyledDeleteButton>
  </StyledProductCard>
);

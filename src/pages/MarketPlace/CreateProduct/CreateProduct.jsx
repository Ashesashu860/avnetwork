import React, { useState, useEffect } from "react";
import { ContentContainer } from "../../../components";
import {
  TextField,
  InputAdornment,
  Avatar,
  CircularProgress,
} from "@material-ui/core";
import styled from "styled-components";
import { AddImageCard } from "./AddImageCard";
import { useDispatch, useSelector } from "react-redux";
import { uploadProductImage } from "../../../redux/actions";
import { v4 as uuidv4 } from "uuid";

const StyledTextBox = styled(TextField)`
  width: 40rem;
  @media screen and (max-width: 768px) {
    width: 30rem;
  }

  @media screen and (max-width: 570px) {
    width: 20rem;
  }

  & label.Mui-focused {
    color: var(--primary);
  }
  & .MuiInput-underline:after {
    border-bottom-color: var(--primary);
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: var(--primary);
    }
    &:hover fieldset {
      border-color: var(--primary);
    }
    &.Mui-focused fieldset {
      border-color: var(--primary);
    }
  }
`;

const StyledForm = styled.form`
  & > *:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const StyledTextArea = styled.fieldset`
  border: 1px solid var(--primary);
  border-radius: 4px;
  & textarea {
    padding: 0.5rem 1rem;
    width: 40rem;
    height: 6rem;
    @media screen and (max-width: 768px) {
      width: 30rem;
    }

    @media screen and (max-width: 570px) {
      width: 20rem;
    }
    background: transparent;
    border: none;
    outline: none;

    &:focus {
      outline: none;
    }
  }
`;

const StyledLegend = styled.legend`
  font-size: 0.7rem;
  margin-left: 0.7rem;
  padding: 0.5rem;
  color: var(--primary);
`;

const StyledImageContainer = styled.div`
  & > * {
    margin-bottom: 1rem;
  }

  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

const StyledLoadingCard = styled(Avatar)`
  height: 7rem !important;
  width: 7rem !important;
  position: relative !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  &::after {
    position: absolute;
    width: 100%;
    height: 100%;
    content: "";
    filter: blur(4px);
  }
`;

const mapState = (state) => ({
  isProductImageUploading: state.marketPlace.isProductImageUploading,
  currentProduct: state.marketPlace.currentProduct,
  cuurentUser: state.users.cuurentUser,
});

export const CreateProduct = () => {
  const { isProductImageUploading, currentProduct, cuurentUser } =
    useSelector(mapState);
  const [selectedImage, setSelectedImage] = useState(null);
  const [product, setProduct] = useState({
    id: currentProduct?.id || uuidv4(),
    title: currentProduct?.title,
    brand: currentProduct?.brand,
    price: currentProduct?.price,
    description: currentProduct?.description,
    user: cuurentUser?.uid,
    images: currentProduct?.images,
  });
  const dispatch = useDispatch();

  const onImageChange = (event) => {
    console.log("Photo", event.target.files[0]);
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
    dispatch(uploadProductImage(product.id, event.target.files[0]));
  };

  useEffect(() => {
    !isProductImageUploading && setSelectedImage(null);
  }, [isProductImageUploading]);

  console.log("currentProduct", currentProduct);
  return (
    <div
      className="center"
      style={{ flexDirection: "column", paddingBottom: "2rem" }}
    >
      <ContentContainer
        style={{ alignItems: "center" }}
        subHeading={"Post your product"}
        content={"Fill the required details to post your product"}
      />
      <StyledForm className="center" style={{ flexDirection: "column" }}>
        <StyledTextBox label="Title *" variant="outlined" />
        <StyledTextBox
          label="Brand *"
          variant="outlined"
          style={{ marginBottom: "1.2rem" }}
        />
        <StyledTextArea>
          <StyledLegend>Description *</StyledLegend>
          <textarea />
        </StyledTextArea>
        <StyledTextBox
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            type: "number",
          }}
          label="Price *"
          variant="outlined"
        />
        <h4>Upload upto 4 photos of the product</h4>
        <StyledImageContainer className="center">
          {isProductImageUploading && (
            <ProductImageCard
              selectedImage={selectedImage}
              loading={isProductImageUploading}
            />
          )}
          {currentProduct?.images?.map((image) => (
            <ProductImageCard selectedImage={image} loading={false} />
          ))}
          <AddImageCard onImageChange={onImageChange} />
        </StyledImageContainer>
      </StyledForm>
    </div>
  );
};

const ProductImageCard = ({ selectedImage, loading }) => (
  <StyledLoadingCard
    variant="rounded"
    style={{
      backgroundImage: `url(${selectedImage})`,
    }}
  >
    <div
      className="center"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "#00000055",
      }}
    >
      <CircularProgress variant="indeterminate" color="#fff" />
    </div>
  </StyledLoadingCard>
);

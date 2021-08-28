import React, { useState } from "react";
import { ContentContainer, StyledFab } from "../../../components";
import {
  TextField,
  InputAdornment,
  Grid,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import styled from "styled-components";
import { AddImageCard } from "./AddImageCard";
import { useDispatch, useSelector } from "react-redux";
import { addProductInDbAction } from "../../../redux/actions";
import { v4 as uuidv4 } from "uuid";
import { ProductImageCard } from "./ProductImageCard";
import { useHistory, Redirect } from "react-router-dom";

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

const StyledSelect = styled(Select)`
  border: 1px solid ${(props) => (props.error ? "#f44336" : "var(--primary)")};
`;
const StyledTextArea = styled.fieldset`
  border: 1px solid ${(props) => (props.error ? "#f44336" : "var(--primary)")};
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
  color: ${(props) => (props.error ? "#f44336" : "var(--primary)")};
`;

const StyledImageContainer = styled.div`
  & > * {
    margin-bottom: 1rem;
    margin-right: 1rem;
  }
`;

const ErrorText = styled.span`
  color: #f44336;
  font-size: 0.75rem;
  margin-left: 1rem;
  margin-top: 0.4rem;
`;

const mapState = (state) => ({
  currentUser: state.users.currentUser,
});

const initialErrors = {
  title: "",
  location: "",
  sellarName: "",
  category: "",
  brand: "",
  description: "",
  stock: "",
};

const categories = [
  "Cables and connectors",
  "Display panels and systems",
  "Speakers And amplifier",
  "Lighting equipment",
  "Accessories",
  "Trussing systems",
  "Automation systems",
];

const toSentenceCase = (str) => {
  const res = str.replace(/([A-Z])/g, " $1");
  return res.charAt(0).toUpperCase() + res.slice(1);
};

export const CreateProduct = () => {
  const { currentUser } = useSelector(mapState);
  const [product, setProduct] = useState({
    id: uuidv4(),
    title: "",
    location: "",
    sellarName: currentUser?.displayName,
    category: "",
    brand: "",
    description: "",
    stock: "",
    user: currentUser?.uid,
    images: [],
  });

  const [errors, setErrors] = useState(initialErrors);

  const dispatch = useDispatch();
  const history = useHistory();

  const onChange = (event) => {
    console.log("onChange", event.target.value);
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
    setErrors({
      ...errors,
      [event.target.name]: "",
    });
  };

  const onBlur = (event) => {
    setErrors({
      ...errors,
      [event.target.name]:
        !event.target.value &&
        `${toSentenceCase(event.target.name)} is required`,
    });
  };

  const onImageChange = (event) => {
    console.log("Photo", event.target.files[0]);
    setProduct({
      ...product,
      images: [...product?.images, event.target.files[0]],
    });
  };

  const onDeleteImage = (imageIndex) => {
    setProduct({
      ...product,
      images: product?.images.filter((image, index) => imageIndex !== index),
    });
  };

  const isAllFieldsValid = () => {
    const errorObject = initialErrors;
    Object.keys(initialErrors).forEach((item) => {
      errorObject[item] = !product[item] && `${item} is required`;
    });
    setErrors({
      ...errorObject,
    });
    return !Object.values(errorObject).reduce((a, b) => a + b);
  };

  const onCreateProduct = (event) => {
    isAllFieldsValid() &&
      dispatch(addProductInDbAction(product, currentUser?.uid, history));
  };

  console.log("Create Product", product);
  return !currentUser ? (
    <Redirect to="/" />
  ) : (
    <div
      className="wrapper center"
      style={{ flexDirection: "column", paddingBottom: "2rem" }}
    >
      <ContentContainer
        style={{ alignItems: "center" }}
        subHeading={"Post your product"}
        content={"Fill the required details to post your product"}
      />
      <StyledForm className="center" style={{ flexDirection: "column" }}>
        <StyledTextBox
          label="Title *"
          variant="outlined"
          name="title"
          onChange={onChange}
          onBlur={onBlur}
          error={!!errors.title}
          helperText={errors.title}
        />
        <StyledTextBox
          label="Location *"
          variant="outlined"
          name="location"
          onChange={onChange}
          onBlur={onBlur}
          error={!!errors.location}
          helperText={errors.location}
        />
        <StyledTextBox
          label="Brand *"
          variant="outlined"
          name="brand"
          onChange={onChange}
          onBlur={onBlur}
          error={!!errors.brand}
          helperText={errors.brand}
        />
        <FormControl
          variant="outlined"
          style={{ minWidth: "100%", maxWidth: "100%" }}
        >
          <InputLabel>Category *</InputLabel>
          <StyledSelect
            native
            onChange={onChange}
            onBlur={onBlur}
            name="category"
            label="Category"
            error={!!errors.category}
          >
            <option value={""}></option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </StyledSelect>
          {errors.category && <ErrorText>{errors.category}</ErrorText>}
        </FormControl>
        <div>
          <StyledTextArea error={!!errors.description}>
            <StyledLegend error={!!errors.description}>
              Description *
            </StyledLegend>
            <textarea name="description" onChange={onChange} onBlur={onBlur} />
          </StyledTextArea>
          {errors.description && <ErrorText>{errors.description}</ErrorText>}
        </div>
        <StyledTextBox
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            type: "number",
          }}
          onChange={onChange}
          onBlur={onBlur}
          label="Price *"
          variant="outlined"
          name="price"
          error={!!errors.price}
          helperText={errors.price}
        />
        <StyledTextBox
          InputProps={{
            type: "number",
          }}
          onChange={onChange}
          onBlur={onBlur}
          label="Stock *"
          variant="outlined"
          name="stock"
          error={!!errors.stock}
          helperText={errors.stock}
        />
        <h4>Upload upto 4 photos of the product</h4>
        <StyledImageContainer className="center" style={{ flexWrap: "wrap" }}>
          {product?.images?.map((image, index) => (
            <ProductImageCard
              selectedImage={image}
              onDeleteImage={() => onDeleteImage(index)}
            />
          ))}
          {product?.images?.length < 4 && (
            <AddImageCard onImageChange={onImageChange} />
          )}
        </StyledImageContainer>
      </StyledForm>
      <Grid container wrap="nowrap" alignItems="center" justify="center">
        <StyledFab
          variant="extended"
          bold
          secondary
          style={{ marginRight: "1rem" }}
        >
          Cancel
        </StyledFab>
        <StyledFab variant="extended" bold primary onClick={onCreateProduct}>
          Create
        </StyledFab>
      </Grid>
    </div>
  );
};

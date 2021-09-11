import React, { useState, useEffect } from "react";
import {
  ContentContainer,
  StyledFab,
  StyledForm,
  StyledTextBox,
  StyledTextArea,
  StyledSelect,
  ErrorText,
  StyledImageContainer,
  AddImageCard,
  ProductImageCard,
} from "../../../components";
import {
  InputAdornment,
  Grid,
  FormControl,
  InputLabel,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { addProductInDbAction } from "../../../redux/actions";
import { v4 as uuidv4 } from "uuid";
import { useHistory, Redirect } from "react-router-dom";

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onChange = (event) => {
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
          value={product?.title}
        />
        <StyledTextBox
          label="Location *"
          variant="outlined"
          name="location"
          onChange={onChange}
          onBlur={onBlur}
          error={!!errors.location}
          helperText={errors.location}
          value={product?.location}
        />
        <StyledTextBox
          label="Brand *"
          variant="outlined"
          name="brand"
          onChange={onChange}
          onBlur={onBlur}
          error={!!errors.brand}
          helperText={errors.brand}
          value={product?.brand}
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
            value={product?.category}
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
        <StyledTextArea
          onBlur={onBlur}
          title="Description *"
          onChange={onChange}
          name="description"
          error={errors.description}
          color="primary"
          value={product?.description}
        />
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
          value={product?.price}
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
          value={product?.stock}
        />
        <h4>Upload upto 4 photos of the product</h4>
        <StyledImageContainer className="center" style={{ flexWrap: "wrap" }}>
          {product?.images?.map((image, index) => (
            <ProductImageCard
              selectedImage={URL.createObjectURL(image)}
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

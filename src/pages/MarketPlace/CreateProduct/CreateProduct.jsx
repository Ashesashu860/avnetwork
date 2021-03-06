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
  Checkbox,
  FormControl,
  InputLabel,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import {
  addProductInDbAction,
  getAllUsersAction,
} from "../../../redux/actions";
import { v4 as uuidv4 } from "uuid";
import { useHistory, Redirect } from "react-router-dom";
import { marketPlaceProductCategories } from "../../masterData";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { toSentenceCase } from "../../../utilities";

const CreateProductSubContainer = styled(StyledForm)`
  flex-direction: column;
`;

const mapState = (state) => ({
  currentUser: state?.users?.currentUser,
  allUsers: state?.users?.allUsers?.sort(),
});

const initialErrors = {
  title: "",
  location: "",
  sellarName: "",
  category: "",
  brand: "",
  description: "",
};

export const CreateProduct = (props) => {
  const { currentUser, allUsers } = useSelector(mapState);
  const [selectedUser, setSelectedUser] = useState();
  const [product, setProduct] = useState(
    props?.history?.location?.state?.currentProduct || {
      id: uuidv4(),
      title: "",
      location: "",
      sellarName: currentUser?.displayName,
      category: "",
      brand: "",
      description: "",
      stock: "",
      images: [],
      newImages: [],
      deletedImages: [],
    }
  );

  const [errors, setErrors] = useState(initialErrors);

  const dispatch = useDispatch();
  const history = useHistory();

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

  useEffect(() => {
    window.scrollTo(0, 0);
    currentUser?.category === "Admin" && dispatch(getAllUsersAction());
    const abortController = new AbortController();
    return () => {
      abortController.abort();
    };
  }, []);

  const onChangeUser = (event) => {
    setSelectedUser(event.target.value);
  };

  const onBlur = (event) => {
    event.target.name !== "stock" &&
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
      newImages: [...(product?.newImages || []), event.target.files[0]],
    });
  };

  const onDeleteImage = (imageId) => {
    if (typeof imageId === "string") {
      const newImages = { ...product?.images };
      delete newImages[imageId];
      setProduct({
        ...product,
        images: newImages,
        deletedImages: [...product?.deletedImages, imageId],
      });
    } else {
      setProduct({
        ...product,
        newImages: product?.newImages.filter(
          (image) => imageId.name !== image.name
        ),
      });
    }
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
    if (isAllFieldsValid()) {
      if (currentUser?.category === "Admin") {
        const sellarName = allUsers?.find(
          (user) => user?.uid === selectedUser
        )?.displayName;
        dispatch(
          addProductInDbAction(
            {
              ...product,
              sellarName,
            },
            selectedUser,
            history
          )
        );
      } else dispatch(addProductInDbAction(product, currentUser?.uid, history));
    }
  };

  //Quote logic
  const [askForQuote, setAskForQuote] = useState(false);
  const onGetQuoteClick = () => {
    setAskForQuote(!askForQuote);
    product?.price &&
      setProduct({
        ...product,
        price: "",
      });
    errors?.price &&
      setErrors({
        ...errors,
        price: "",
      });
  };

  return (
    <>
      <Helmet>
        <title>Create a product</title>
        <meta
          name="description"
          content="Buy/Sell audio products like Speakers, Wires, Audio Cables, Microphones(Mic) etc. by creating and posting an eligible product on our portal."
        />
        <meta
          name="keywords"
          content="Audio, Video, Sound, Speaker, Microphone, Wires, Cables, Mic, Digital, Armoured Cables, AWG, Analog, Blog, Displays, Lightning, Truss, Trussing Systems, Connectors, Amplifiers, Panels, Market Place, Audiophile, Wire guage"
        />
      </Helmet>
      {!currentUser ? (
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
          <Grid item sm={6} xs={9} style={{ width: "100%" }}>
            <CreateProductSubContainer className="center">
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
                  {marketPlaceProductCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </StyledSelect>
                {errors.category && <ErrorText>{errors.category}</ErrorText>}
              </FormControl>
              {currentUser?.category === "Admin" && (
                <FormControl
                  variant="outlined"
                  style={{ minWidth: "100%", maxWidth: "100%" }}
                >
                  <InputLabel>Users *</InputLabel>
                  <StyledSelect
                    native
                    onChange={onChangeUser}
                    name="users"
                    label="Users"
                    value={selectedUser}
                  >
                    <option value={""}></option>
                    {allUsers?.map((user) => (
                      <option key={user?.uid} value={user?.uid}>
                        {user?.displayName}
                      </option>
                    ))}
                  </StyledSelect>
                </FormControl>
              )}
              <StyledTextArea
                onBlur={onBlur}
                title="Description *"
                onChange={onChange}
                name="description"
                error={errors.description}
                color="primary"
                value={product?.description}
                style={{ minWidth: "100%" }}
              />
              <Grid
                container
                wrap="nowrap"
                alignItems="center"
                justifyContent="center"
              >
                <StyledTextBox
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">???</InputAdornment>
                    ),
                    type: "number",
                  }}
                  onChange={onChange}
                  onBlur={onBlur}
                  label="Price *"
                  variant="outlined"
                  name="price"
                  disabled={askForQuote}
                  value={product?.price}
                  error={!!errors.price}
                  helperText={errors.price}
                />
                <Checkbox
                  onClick={onGetQuoteClick}
                  checked={askForQuote}
                  checkedIcon={
                    <StyledFab variant="extended" bold primary>
                      Write Quote
                    </StyledFab>
                  }
                  icon={
                    <StyledFab variant="extended" bold primary>
                      Get Quote
                    </StyledFab>
                  }
                  {...props}
                />
              </Grid>
              <StyledTextBox
                InputProps={{
                  type: "number",
                }}
                onChange={onChange}
                onBlur={onBlur}
                label="Stock (Optional)"
                variant="outlined"
                name="stock"
                error={!!errors.stock}
                helperText={errors.stock}
                value={product?.stock}
              />
              <h4>Upload upto 4 photos of the product</h4>
              <StyledImageContainer
                className="center"
                style={{ flexWrap: "wrap" }}
              >
                {[
                  ...(product?.images ? Object.keys(product?.images) : []),
                  ...(product?.newImages || []),
                ].map((key, index) => {
                  const image =
                    typeof key === "string"
                      ? product?.images[key]
                      : key && URL.createObjectURL(key);
                  return (
                    <ProductImageCard
                      key={index}
                      selectedImage={image}
                      onDeleteImage={() => onDeleteImage(key)}
                    />
                  );
                })}
                {[
                  ...(product?.images ? Object.keys(product?.images) : []),
                  ...(product?.newImages || []),
                ].length < 4 && <AddImageCard onImageChange={onImageChange} />}
              </StyledImageContainer>
            </CreateProductSubContainer>
          </Grid>
          <Grid
            container
            wrap="nowrap"
            alignItems="center"
            justifyContent="center"
          >
            <StyledFab
              variant="extended"
              bold
              secondary
              style={{ marginRight: "1rem" }}
            >
              Cancel
            </StyledFab>
            <StyledFab
              variant="extended"
              bold
              primary
              onClick={onCreateProduct}
            >
              {props?.history?.location?.state?.currentProduct
                ? "Update"
                : "Create"}
            </StyledFab>
          </Grid>
        </div>
      )}
    </>
  );
};

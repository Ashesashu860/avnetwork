import React from "react";
import { FormControl, InputLabel, Select, TextField } from "@material-ui/core";
import {
  ProductImageCard,
  StyledImageContainer,
  AddImageCard,
} from "../../../components";
import { userCategories } from "../../masterData";

export const BasicDetailsForm = ({
  basicDetails,
  onChange,
  onImageChange,
  onDeleteImage,
}) => {
  // const userWorkImages = basicDetails?.update
  //   ? basicDetails?.userWorkImages && Object.keys(basicDetails?.userWorkImages)
  //   : basicDetails?.userWorkImages;

  return (
    <div
      className="center"
      style={{ flexDirection: "column", marginTop: "1rem" }}
    >
      <FormControl
        variant="outlined"
        style={{ minWidth: "90%", margin: "1rem" }}
      >
        <InputLabel>Category</InputLabel>
        <Select
          native
          value={basicDetails?.category}
          onChange={onChange}
          name="category"
          label="Category"
          disabled={basicDetails?.category === "Admin"}
        >
          <option value={""}></option>
          {userCategories?.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </FormControl>
      {basicDetails?.category === "Admin" && (
        <span style={{ textAlign: "left" }}>
          Admins cannot change their category
        </span>
      )}
      <TextField
        value={basicDetails?.phoneNumber}
        name="phoneNumber"
        onChange={onChange}
        variant="outlined"
        placeholder="Phone Number"
        type="number"
        style={{ minWidth: "90%", margin: "1rem" }}
      />
      <h4 style={{ margin: "1rem 0 2rem 0" }}>
        Upload upto 4 photos of your work (Optional)
      </h4>
      <StyledImageContainer className="center" style={{ flexWrap: "wrap" }}>
        {[
          ...Object.keys(basicDetails?.userWorkImages),
          ...basicDetails?.newImages,
        ].map((key, index) => {
          const image =
            typeof key === "string"
              ? basicDetails?.userWorkImages[key]
              : key && URL.createObjectURL(key);
          return (
            image && (
              <ProductImageCard
                key={index}
                selectedImage={image}
                onDeleteImage={() => onDeleteImage(key)}
              />
            )
          );
        })}
        {[
          ...Object.keys(basicDetails?.userWorkImages),
          ...basicDetails?.newImages,
        ].length < 4 && <AddImageCard onImageChange={onImageChange} />}
      </StyledImageContainer>
    </div>
  );
};

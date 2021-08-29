import React from "react";
import { FormControl, InputLabel, Select, TextField } from "@material-ui/core";
import {
  ProductImageCard,
  StyledImageContainer,
  AddImageCard,
} from "../../../components";

export const BasicDetailsForm = ({
  basicDetails,
  onChange,
  onImageChange,
  onDeleteImage,
}) => {
  const categories = ["Integrator", "Dealer", "Rental", "Freelancer", "Guest"];

  return (
    <div className="center" style={{ flexDirection: "column" }}>
      <FormControl
        variant="outlined"
        style={{ minWidth: "90%", margin: "1rem" }}
      >
        <InputLabel>Category</InputLabel>
        <Select
          native
          value={basicDetails.category}
          onChange={onChange}
          name="category"
          label="Category"
        >
          <option value={""}></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </FormControl>
      <TextField
        value={basicDetails.phoneNumber}
        name="phoneNumber"
        onChange={onChange}
        variant="outlined"
        placeholder="Phone Number"
        style={{ minWidth: "90%", margin: "1rem" }}
      />
      <h4 style={{ marginBottom: "1rem" }}>
        Upload upto 4 photos of your work (Optional)
      </h4>
      <StyledImageContainer className="center" style={{ flexWrap: "wrap" }}>
        {basicDetails?.images?.map((image, index) => (
          <ProductImageCard
            selectedImage={image}
            onDeleteImage={() => onDeleteImage(index)}
          />
        ))}
        <AddImageCard onImageChange={onImageChange} />
      </StyledImageContainer>
    </div>
  );
};

import React from "react";
import { FormControl, InputLabel, Select, TextField } from "@material-ui/core";
import {
  ProductImageCard,
  StyledImageContainer,
  AddImageCard,
  StyledTextArea,
} from "../../../components";
import "./basic-details-form.css";
import { userCategories } from "../../masterData";

export const BasicDetailsForm = ({
  basicDetails,
  onChange,
  onImageChange,
  onDeleteImage,
}) => {
  return (
    <div className="center basic_details_form_container">
      <div>
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
          label="Phone Number"
          type="number"
          style={{ minWidth: "90%", margin: "1rem" }}
        />
        <FormControl
          style={{ minWidth: "90%", margin: "1rem", marginTop: "0.5rem" }}
        >
          <StyledTextArea
            title="Address"
            label="Address"
            onChange={onChange}
            name="address"
            value={basicDetails?.address}
          />
        </FormControl>
        <TextField
          value={basicDetails?.serviceLocations}
          name="serviceLocations"
          onChange={onChange}
          variant="outlined"
          label="Service Locations"
          placeholder="Enter comma separated details"
          style={{ minWidth: "90%", margin: "1rem" }}
        />
      </div>
      <div className="basic_details_photos_container">
        <h4 style={{ marginBottom: "1rem" }}>
          Upload upto 4 photos of your work (Optional)
        </h4>
        <StyledImageContainer className="center" style={{ flexWrap: "wrap" }}>
          {[
            ...(basicDetails?.userWorkImages
              ? Object.keys(basicDetails?.userWorkImages)
              : []),
            ...(basicDetails?.newImages || []),
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
            ...(basicDetails?.userWorkImages
              ? Object.keys(basicDetails?.userWorkImages)
              : []),
            ...(basicDetails?.newImages || []),
          ].length < 4 && <AddImageCard onImageChange={onImageChange} />}
        </StyledImageContainer>
      </div>
    </div>
  );
};

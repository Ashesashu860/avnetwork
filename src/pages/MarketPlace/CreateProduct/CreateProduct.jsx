import React from "react";
import { ContentContainer } from "../../../components";
import { TextField, InputAdornment, Grid, Avatar } from "@material-ui/core";
import styled from "styled-components";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

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

export const CreateProduct = () => {
  const onImageChange = (event) => {
    console.log("Photo", event.target.files[0]);
  };

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
        <Grid container>
          <Avatar
            variant="rounded"
            style={{ backgroundColor: "#ddd", height: "7rem", width: "7rem" }}
            onClick={() => document.getElementById("product_image").click()}
          >
            <AddAPhotoIcon style={{ color: "var(--primary)" }} />
            <input
              id="product_image"
              type="file"
              onChange={onImageChange}
              style={{ display: "none" }}
            />
          </Avatar>
        </Grid>
      </StyledForm>
    </div>
  );
};

// const PhotoCard = () => {
//   const Container = styled.div`
//     width: 7rem;
//     height: 7rem;
//     border: 1px solid var(--primary);
//     border-radius: 4px;
//   `;
//   return (
//     <Container className="center">
//       <AddAPhotoIcon style={{ color: "var(--primary)" }} />
//     </Container>
//   );
// };

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Grid,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import {
  StyledButton,
  StyledTextBox,
  StyledSelect,
  ErrorText,
} from "../../components";
import { tutorialsCategories } from "../masterData";
import styled from "styled-components";
import { toSentenceCase } from "../../utilities";
import { useDispatch, useSelector } from "react-redux";
import { uploadTutorialAction } from "../../redux/actions";
import { useHistory } from "react-router-dom";

const StyledDialogContent = styled(DialogContent)`
  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const tutorialTemplate = {
  id: "",
  title: "",
  category: "",
};

const getDataFromState = (state) => ({
  currentUser: state?.users?.currentUser,
});

export const UploadTutorial = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(getDataFromState);

  const [tutorial, setTutorial] = useState({
    ...tutorialTemplate,
    userId: currentUser?.uid,
  });

  const [errors, setErrors] = useState(tutorialTemplate);

  const onChange = (event) => {
    setTutorial({
      ...tutorial,
      [event.target.name]: event.target.value,
    });
    setErrors({
      ...errors,
      [event.target.name]: "",
    });
  };

  const allFieldsAreValid = () => {
    const errors = {
      id: !tutorial.id ? "Link is required" : "",
      title: !tutorial.title ? "Title is required" : "",
      category: !tutorial.category ? "Category is required" : "",
    };
    setErrors(errors);
    return !Object.values(errors)?.reduce((a, b) => a + b);
  };

  const onBlur = (event) => {
    setErrors({
      ...errors,
      [event.target.name]:
        !event.target.value &&
        `${toSentenceCase(
          event.target.name === "id" ? "Link" : event.target.name
        )} is required`,
    });
  };

  const onUpload = () => {
    if (allFieldsAreValid()) {
      dispatch(
        uploadTutorialAction(
          {
            ...tutorial,
            id: tutorial?.id?.split("/")?.pop(),
          },
          history
        )
      );
    }
  };

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <div
        className="center"
        style={{ flexDirection: "column", padding: "2rem 4rem" }}
      >
        <h3 id="simple-dialog-title" style={{ color: "#aaa" }}>
          Upload Tutorial
        </h3>
        <StyledDialogContent>
          <StyledTextBox
            label="Link *"
            variant="outlined"
            name="id"
            onChange={onChange}
            onBlur={onBlur}
            error={!!errors.id}
            helperText={errors.id}
            value={tutorial?.id}
          />
          <StyledTextBox
            label="Title *"
            variant="outlined"
            name="title"
            onChange={onChange}
            onBlur={onBlur}
            error={!!errors.title}
            helperText={errors.title}
            value={tutorial?.title}
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
              label="Category *"
              error={!!errors.category}
              value={tutorial?.category}
            >
              <option value={""}></option>
              {tutorialsCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </StyledSelect>
            {errors.category && <ErrorText>{errors.category}</ErrorText>}
          </FormControl>
        </StyledDialogContent>
        <Grid
          container
          direction="row"
          wrap="nowrap"
          justifyContent="center"
          style={{ marginTop: "1rem" }}
        >
          <StyledButton
            title="Cancel"
            secondary
            onClick={onClose}
            style={{ marginRight: "1rem" }}
          >
            Cancel
          </StyledButton>
          <StyledButton title="Cancel" primary onClick={onUpload} filled>
            Upload
          </StyledButton>
        </Grid>
      </div>
    </Dialog>
  );
};

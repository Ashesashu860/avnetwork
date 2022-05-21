import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  makeStyles,
  Checkbox,
  withStyles,
} from "@material-ui/core";
import { StyledButton } from "../../components";
import { TermsOfUse } from "..";
import "./register.css";
import { useDispatch } from "react-redux";
import { logoutUserAction, setUserInDbAction } from "../../redux/actions";
import { Redirect } from "react-router-dom";
import { BasicDetailsForm } from "./BasicDetailsForm";

const CustomCheckbox = withStyles({
  root: {
    color: "var(--primary)",
    "&$checked": {
      color: "var(--primary)",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > div > h1": {
      textAlign: "center",
      color: "var(--primary)",
      padding: "1rem 0",
    },
  },
  button: {
    marginRight: theme.spacing(1),
  },
  step: {
    "& svg": {
      color: "var(--primary) !important",
    },
  },
}));

function getSteps() {
  return ["Gmail Login", "Basic Details", "Terms of Use"];
}

export const Register = (props) => {
  const user = props.location?.state?.user;

  const dispatch = useDispatch();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 2 && checked) {
      dispatch(
        setUserInDbAction(
          {
            ...user,
            ...basicDetails,
            coupons: ["NEW200"],
          },
          props.history
        )
      );
    }
  };

  const handleBack = () => {
    activeStep === 1
      ? dispatch(logoutUserAction())
      : setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return "Login with your Gmail account";
      case 1:
        return `Hi ${user.displayName.split(" ")[0]}, Just a few more details`;
      case 2:
        return "Last step to be our member";
      case 3:
        return "Signing you up. Please Wait...";
      default:
    }
  }

  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (event) => setChecked(event.target.checked);

  const [basicDetails, setBasicDetails] = useState({
    category: "",
    phoneNumber: "",
    address: "",
    serviceLocations: "",
    newImages: [],
  });

  const onChange = (event) => {
    setBasicDetails({
      ...basicDetails,
      [event.target.name]: event.target.value,
    });
  };

  const onImageChange = (event) => {
    setBasicDetails({
      ...basicDetails,
      newImages: [...basicDetails?.newImages, event.target.files[0]],
    });
  };

  const onDeleteImage = (image) => {
    setBasicDetails({
      ...basicDetails,
      newImages: basicDetails?.newImages.filter(
        (newImage) => image?.name !== newImage?.name
      ),
    });
  };

  const getRenderItem = (activeStep) => {
    switch (activeStep) {
      case 1:
        return (
          <form>
            <BasicDetailsForm
              basicDetails={basicDetails}
              onChange={onChange}
              onImageChange={onImageChange}
              onDeleteImage={onDeleteImage}
            />
          </form>
        );
      case 2:
        return <TermsOfUse />;
      default:
    }
  };

  const isNextDisabled = () =>
    activeStep === steps.length ||
    !basicDetails.category ||
    !basicDetails.phoneNumber ||
    !basicDetails.address ||
    !basicDetails.serviceLocations ||
    (activeStep === 2 && !checked);

  return (
    <>
      {user ? (
        <div
          className={`${classes.root} wrapper fix_wrapper center`}
          style={{ flexDirection: "column" }}
        >
          <h2
            style={{
              padding: "2rem 1rem",
              alignSelf: "flex-start",
              textAlign: "center",
              width: "100%",
            }}
          >
            {getStepContent(activeStep)}
          </h2>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "0.5rem",
              flex: 1,
              overflow: "auto",
              width: "90%",
              border: "1px solid #ddd",
            }}
          >
            {getRenderItem(activeStep)}
          </div>
          <div className="stepper">
            {activeStep === 2 && (
              <div className="center">
                <CustomCheckbox
                  onChange={handleCheckboxChange}
                  checked={checked}
                />
                <span style={{ opacity: "0.7" }}>
                  I accept the terms of use.
                </span>
              </div>
            )}
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepLabel className={classes.step}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep !== steps.length && (
              <div className="center" style={{ marginTop: "1rem" }}>
                <StyledButton
                  onClick={handleBack}
                  className={classes.button}
                  secondary
                >
                  {activeStep === 1 ? "Cancel" : "Back"}
                </StyledButton>
                <StyledButton
                  onClick={handleNext}
                  disabled={isNextDisabled()}
                  className={classes.button}
                  {...(isNextDisabled()
                    ? { secondary: true }
                    : { primary: true })}
                >
                  {activeStep > steps.length - 2 ? "Finish" : "Next"}
                </StyledButton>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

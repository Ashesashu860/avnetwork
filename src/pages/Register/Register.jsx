import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  makeStyles,
  Checkbox,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@material-ui/core";
import { StyledButton } from "../../components";
import { TermsOfUse } from "..";
import "./register.css";
import { useDispatch } from "react-redux";
import { logoutUserAction, setUserInDbAction } from "../../redux/actions";
import { Redirect } from "react-router-dom";

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
  });

  const onChange = (event) => {
    setBasicDetails({
      ...basicDetails,
      [event.target.name]: event.target.value,
    });
  };

  const categories = ["Integrator", "Dealer", "Rental", "Freelancer", "Guest"];

  const getRenderItem = (activeStep) => {
    switch (activeStep) {
      case 1:
        return (
          <div>
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
          </div>
        );
      case 2:
        return <TermsOfUse />;
      default:
    }
  };

  return (
    <>
      {user ? (
        <div
          className={`${classes.root} wrapper fix_wrapper register_container`}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <h1>{getStepContent(activeStep)}</h1>
            <div className="terms center">{getRenderItem(activeStep)}</div>
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
              <div className="center">
                <StyledButton
                  onClick={handleBack}
                  className={classes.button}
                  secondary
                >
                  {activeStep === 1 ? "Cancel" : "Back"}
                </StyledButton>
                <StyledButton
                  onClick={handleNext}
                  disabled={
                    activeStep === steps.length ||
                    !basicDetails.category ||
                    !basicDetails.phoneNumber ||
                    (activeStep === 2 && !checked)
                  }
                  className={classes.button}
                  {...(activeStep === steps.length ||
                  !basicDetails.category ||
                  !basicDetails.phoneNumber ||
                  (activeStep === 2 && !checked)
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

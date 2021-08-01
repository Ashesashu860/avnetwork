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
} from "@material-ui/core";
import { StyledButton } from "../../components";
import { TermsOfUse } from "..";
import "./register.css";
import firebase from "../../config/firebase-config";
import { useDispatch } from "react-redux";
import { setUserInDbAction } from "../../redux/actions";

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
  return ["Gmail Login", "Select a Category", "Terms of Use"];
}

export const Register = (props) => {
  const { user } = props.location.state;

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
            category,
          },
          props.history
        )
      );
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return "Login with your Gmail account";
      case 1:
        return `Hi ${
          user.displayName.split(" ")[0]
        }, Tell us about your preferred category`;
      case 2:
        return "Last step to be our member";
      case 3:
        return "Signing you up. Please Wait...";
      default:
    }
  }

  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (event) => setChecked(event.target.checked);

  const [category, setCategory] = useState("");

  const onCategoryChange = (event) => setCategory(event.target.value);

  const categories = ["Integrator", "Dealer", "Rental", "Freelancer", "Guest"];

  const getRenderItem = (activeStep) => {
    switch (activeStep) {
      case 1:
        return (
          <FormControl
            variant="outlined"
            style={{ minWidth: "90%", margin: "1rem" }}
          >
            <InputLabel>Category</InputLabel>
            <Select
              native
              value={category}
              onChange={onCategoryChange}
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
        );
      case 2:
        return <TermsOfUse />;
      default:
    }
  };

  return (
    <div
      className={`${classes.root} wrapper fix_wrapper`}
      style={{ padding: "2rem" }}
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

        <div className="stepper">
          {activeStep === 2 && (
            <div className="center">
              <CustomCheckbox
                onChange={handleCheckboxChange}
                checked={checked}
              />
              <span style={{ opacity: "0.7" }}>I accept the terms of use.</span>
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
                disabled={activeStep === 1}
                onClick={handleBack}
                className={classes.button}
                secondary
              >
                Back
              </StyledButton>
              <StyledButton
                onClick={handleNext}
                disabled={
                  activeStep === steps.length ||
                  !category ||
                  (activeStep === 2 && !checked)
                }
                className={classes.button}
                {...(activeStep === steps.length ||
                !category ||
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
    </div>
  );
};

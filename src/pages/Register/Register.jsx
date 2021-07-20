import React from "react";
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

export const Register = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return "Login with your Gmail account";
      case 1:
        return "Tell us your preferred category";
      case 2:
        return "Last step to be our member";
      default:
        return "Please Wait...";
    }
  }

  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (event) => setChecked(event.target.checked);

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
        <div className="terms">{activeStep === 2 && <TermsOfUse />}</div>

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
                activeStep === steps.length || (activeStep === 2 && !checked)
              }
              className={classes.button}
              primary
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </StyledButton>
          </div>
        </div>
      </div>
    </div>
  );
};

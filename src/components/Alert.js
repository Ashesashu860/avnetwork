import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const SampleAlert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const Alert = ({ title, severity, onClose }) => {
  return (
    <Snackbar open={!!title} autoHideDuration={3000} onClose={onClose}>
      <SampleAlert onClose={onClose} severity={severity}>
        {title}
      </SampleAlert>
    </Snackbar>
  );
};

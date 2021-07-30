import React, { useState, useEffect } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const SampleAlert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const Alert = ({ title }) => {
  const [open, setOpen] = useState(!!title);

  useEffect(() => {
    setOpen(!!title);
  }, [title]);

  const onClose = () => setOpen(false);
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <SampleAlert onClose={onClose} severity={"error"}>
        {title}
      </SampleAlert>
    </Snackbar>
  );
};

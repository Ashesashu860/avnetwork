import React from "react";
import { Dialog, DialogTitle } from "@material-ui/core";
import Logo from "../assets/logo.svg";
import { LoaderIcon, StyledFab } from "../components";

export const DialogBox = (props) => {
  const { handleClose, open, title, hideLoader, buttonProps } = props;

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div
        className="center"
        style={{ flexDirection: "column", padding: "2rem 4rem" }}
      >
        <img src={Logo} alt="Logo" style={{ maxHeight: "8rem" }} />
        <DialogTitle id="simple-dialog-title" style={{ color: "#aaa" }}>
          {title}
        </DialogTitle>
        {!hideLoader && <LoaderIcon />}
        {buttonProps && (
          <StyledFab onClick={buttonProps?.onButtonClick}>
            {buttonProps?.title}
          </StyledFab>
        )}
      </div>
    </Dialog>
  );
};

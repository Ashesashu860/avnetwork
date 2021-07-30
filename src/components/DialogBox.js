import React from "react";
import { Dialog, DialogTitle } from "@material-ui/core";
import Logo from "../assets/logo.svg";
import { LoaderIcon, StyledFab } from "../components";
import { useDispatch } from "react-redux";
import { setDialogBoxPropsAction } from "../redux/actions";

export const DialogBox = (props) => {
  const dispatch = useDispatch();
  const { title, hideLoader, buttonProps } = props;
  const onClose = (event) => {
    buttonProps?.onButtonClick(event);
    dispatch(setDialogBoxPropsAction(""));
  };
  return (
    <Dialog
      onClose={() => null}
      aria-labelledby="simple-dialog-title"
      open={!!title}
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
          <StyledFab onClick={onClose}>{buttonProps?.title}</StyledFab>
        )}
      </div>
    </Dialog>
  );
};

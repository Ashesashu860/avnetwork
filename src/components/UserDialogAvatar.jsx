import React, { useState } from "react";
import { Avatar, Dialog, Divider } from "@material-ui/core";
import styled from "styled-components";
import { ListItemWithPhoto, StyledFab } from "../components";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useHistory } from "react-router-dom";

const StyledContainer = styled.div`
  height: 100%;
  justify-content: space-between;
  border: ${(props) => props?.name && "1px solid #ccc"};
  border-radius: ${(props) => props?.name && "2rem"};
  padding: ${(props) => props?.name && "0.5rem"};
  margin-left: ${(props) => props?.name && "0.5rem"};
  flex-wrap: nowrap;
`;

const DialogContainer = styled.div`
  padding: 2rem 3rem;
  flex-direction: column;
  align-items: flex-start;
  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const DialogHeader = styled.div`
  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

export const UserDialogAvatar = ({ user, name, height }) => {
  const [open, setOpen] = useState(false);

  const onClick = () => setOpen(true);
  const onClickVisitProfile = () => {
    history.push({
      pathname: "/view_user",
      state: user,
    });
    setOpen(false);
  };

  const history = useHistory();

  return (
    <>
      <StyledContainer className="center" name={name} onClick={onClick}>
        <div className="center">
          <Avatar
            style={{
              height: height,
              width: height,
              marginRight: "0.5rem",
              ...(!name && { marginLeft: "0.5rem" }),
            }}
          >
            <img
              src={user?.photoURL}
              alt={user?.displayName?.charAt(0)}
              style={{ maxHeight: "100%" }}
            />
          </Avatar>
          <p>{name}</p>
        </div>
        <div>
          <StyledFab
            bold
            variant="extended"
            primary
            onClick={onClick}
            style={{ height: "2rem" }}
          >
            Visit
          </StyledFab>
        </div>
      </StyledContainer>
      <Dialog
        onClose={() => null}
        open={open}
        aria-labelledby="simple-dialog-title"
      >
        <DialogContainer className="center">
          <DialogHeader className="center">
            <Avatar style={{ height: "4rem", width: "4rem" }}>
              <img
                src={user?.photoURL}
                alt={user?.displayName?.charAt(0)}
                style={{ maxHeight: "100%" }}
              />
            </Avatar>
            <div>
              <h3 style={{ color: "var(--primary)" }}>{user?.displayName}</h3>
              <p style={{ fontSize: "1.2rem", marginTop: "0.5rem" }}>
                {user?.category}
              </p>
            </div>
          </DialogHeader>
          <Divider style={{ width: "100%" }} />
          <ListItemWithPhoto
            icon={<LocationOnIcon />}
            title={"Service Locations"}
            value={user?.serviceLocations}
          />
          <Divider style={{ width: "100%" }} />
          <div className="center" style={{ width: "100%" }}>
            <StyledFab
              bold
              variant="extended"
              style={{ marginRight: "1rem" }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </StyledFab>
            <StyledFab
              bold
              variant="extended"
              primary
              onClick={onClickVisitProfile}
            >
              Visit Full Profile
            </StyledFab>
          </div>
        </DialogContainer>
      </Dialog>
    </>
  );
};

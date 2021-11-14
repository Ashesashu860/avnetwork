import React, { useState } from "react";
import { Avatar, Dialog, Divider } from "@material-ui/core";
import styled from "styled-components";
import { ListItemWithPhoto, StyledButton } from "../components";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useHistory } from "react-router-dom";
import StorefrontIcon from "@material-ui/icons/Storefront";

const StyledContainer = styled.div`
  height: 100%;
  justify-content: space-between;
  border-radius: ${(props) => props?.name && "1rem"};
  flex-wrap: nowrap;
  width: 100%;
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

const StyledAvatar = styled(Avatar)`
  background-color: var(--primaryLight) !important;
  height: 4rem;
  width: 4rem;
  margin-right: 2rem;

  @media screen and (max-width: 768px) {
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
          <StyledAvatar>
            <StorefrontIcon
              style={{
                height: "1.8rem",
                width: "1.8rem",
                color: "var(--primary)",
              }}
            />
          </StyledAvatar>
          <h3>{name?.toUpperCase()}</h3>
        </div>
        <div>
          <StyledButton bold primary onClick={onClick}>
            Visit Shop
          </StyledButton>
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
            <StyledButton
              style={{ marginRight: "0.5rem" }}
              bold
              secondary
              onClick={() => setOpen(false)}
            >
              Cancel
            </StyledButton>
            <StyledButton bold primary onClick={onClickVisitProfile}>
              Visit Full Profile
            </StyledButton>
          </div>
        </DialogContainer>
      </Dialog>
    </>
  );
};

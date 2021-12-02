import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction, logoutUserAction } from "../redux/actions";
import Logo from "../assets/logo.svg";
import GoogleLogo from "../assets/google.png";
import { navLinks, loggedInLinks } from "./Navbar/NavbarLinks";
import { StyledNavLink, StyledFab } from ".";
import { useHistory } from "react-router-dom";

const Username = styled.div`
  font-size: 1.2rem !important;
  font-family: "Montserrat", sans-serif !important;
  font-weight: bold;
`;

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  & > a:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const mapState = (state) => ({
  currentUser: state.users.currentUser,
});

export const DrawerLayout = (props) => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    props.toggleDrawer();
    dispatch(logoutUserAction(history));
  };

  const handleLogin = () => {
    dispatch(loginUserAction(history));
  };

  const drawerLoggedInLinks = [
    ...loggedInLinks,
    {
      name: "My Profile",
      link: "/profile",
    },
  ];
  const filteredLinks = currentUser
    ? currentUser?.category === "Admin"
      ? drawerLoggedInLinks.concat(navLinks)
      : drawerLoggedInLinks
          .concat(navLinks)
          .filter((link) => link.name !== "Admin")
    : navLinks;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#EEE",
      }}
    >
      <div
        style={{ height: "30%", backgroundColor: "#fff", position: "relative" }}
      >
        <StyledNavLink
          to="/"
          className="center"
          style={{ height: "100%", position: "relative", width: "100%" }}
          onClick={props.toggleDrawer}
        >
          <img src={Logo} alt="Logo" style={{ maxHeight: "10rem" }} />
        </StyledNavLink>
        <div
          className="center"
          style={{
            position: "absolute",
            bottom: "0",
            width: "100%",
            transform: "translate(-50%, 50%)",
            left: "50%",
          }}
        >
          {currentUser ? (
            <Avatar
              style={{
                maxHeight: "10rem",
                maxWidth: "10rem",
              }}
            >
              <img
                src={currentUser?.photoURL}
                alt={currentUser?.displayName?.charAt(0)}
                style={{ maxHeight: "100%" }}
              />
            </Avatar>
          ) : (
            <StyledFab
              variant="extended"
              bold
              primary
              style={{ height: "3rem" }}
              onClick={handleLogin}
            >
              <img
                src={GoogleLogo}
                alt="G"
                style={{
                  maxWidth: "1.4rem",
                  marginRight: "0.5rem",
                  backgroundColor: "var(--secondary)",
                  padding: "4px",
                  borderRadius: "50%",
                }}
              />
              Login/Sign Up
            </StyledFab>
          )}
        </div>
      </div>
      <div
        className="center"
        style={{
          heihgt: "70%",
          paddingTop: "3rem",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {currentUser && (
          <Username>{`Hi, ${
            currentUser?.displayName?.split(" ")[0]
          }`}</Username>
        )}
        <StyledUl>
          {/* <SearchBar /> */}
          {filteredLinks.map((navlink) => {
            return (
              <StyledNavLink
                key={navlink.name}
                to={navlink.link}
                activeClassName="active-link"
                bold
                style={{ fontSize: "1rem" }}
                onClick={props.toggleDrawer}
              >
                {navlink.name}
              </StyledNavLink>
            );
          })}
        </StyledUl>
        {currentUser && (
          <StyledFab
            variant="extended"
            bold
            secondary
            style={{ height: "3rem" }}
            onClick={handleLogout}
          >
            Logout
          </StyledFab>
        )}
      </div>
    </div>
  );
};

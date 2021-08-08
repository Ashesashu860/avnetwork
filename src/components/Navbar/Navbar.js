import React, { useRef } from "react";
import "./navbar.css";
import { StyledNavLink, StyledFab, SearchBar, Logo } from "../../components";
import { Avatar, Drawer, IconButton, Tooltip } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import styled from "styled-components";
import { DrawerLayout } from "../DrawerLayout";
import GoogleLogo from "../../assets/google.png";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserAction,
  logoutUserAction,
} from "../../redux/actions/user_actions";
import { navLinks } from "./NavbarLinks";

const HamburgerIcon = styled.div`
  display: none;
  color: var(--primary);
  @media screen and (max-width: 570px) {
    display: block;
  }
`;

const mapState = (state) => ({
  user: state.user,
});

export const Navbar = withRouter(({ history }) => {
  const navRef = useRef(null);

  const { user } = useSelector(mapState);

  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      window.pageYOffset > 0
        ? navRef?.current?.classList.add("navbar_shadow")
        : navRef?.current?.classList.remove("navbar_shadow");
    });
  }, []);

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (event) => {
    setDrawerOpen(!drawerOpen);
  };

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(loginUserAction(history));
  };

  const handleLogout = () => {
    dispatch(logoutUserAction(history));
  };

  const filteredLinks =
    user?.category === "Admin"
      ? navLinks
      : navLinks.filter((link) => link.name !== "Admin");

  return (
    <>
      <div style={{ position: "fixed", zIndex: "1000" }} ref={navRef}>
        <nav>
          <HamburgerIcon>
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </HamburgerIcon>
          <StyledNavLink
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Logo />
          </StyledNavLink>
          <SearchBar className="search-bar" />
          <div className="outer-left-nav">
            <ul>
              {/* <SearchBar /> */}
              {filteredLinks.map((navlink) => {
                return (
                  <StyledNavLink
                    key={navlink.name}
                    to={navlink.link}
                    activeClassName="active-link"
                    bold
                  >
                    {navlink.name}
                  </StyledNavLink>
                );
              })}
            </ul>
            <div className="left-nav">
              {user ? (
                <div
                  style={{
                    flexWrap: "nowrap",
                  }}
                  className="center"
                >
                  <Tooltip title={`Hi`}>
                    <Avatar
                      style={{
                        maxHeight: "3rem",
                        maxWidth: "3rem",
                        marginRight: "1rem",
                      }}
                    >
                      <img
                        src={user?.photoURL}
                        alt={user?.displayName?.charAt(0)}
                        style={{ maxHeight: "100%" }}
                      />
                    </Avatar>
                  </Tooltip>
                  <StyledFab
                    variant="extended"
                    bold
                    secondary
                    style={{ height: "3rem" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </StyledFab>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </nav>
        <nav
          style={{ position: "relative", marginTop: "-1px" }}
          className="sub-nav"
        >
          <SearchBar width="100%" />
        </nav>
      </div>
      <Drawer
        className="drawer"
        anchor={"left"}
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <DrawerLayout toggleDrawer={toggleDrawer} />
      </Drawer>
    </>
  );
});

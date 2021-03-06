import React, { useRef } from "react";
import "./navbar.css";
import {
  StyledNavLink,
  StyledFab,
  SearchBar,
  Logo,
  StyledButton,
  CollapseSearch,
} from "../../components";
import {
  Avatar,
  Drawer,
  IconButton,
  Tooltip,
  Menu,
  Divider,
  MenuItem,
  Grid,
} from "@material-ui/core";
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
import { navLinks, loggedInLinks } from "./NavbarLinks";

const HamburgerIcon = styled.div`
  display: none;
  color: var(--primary);
  @media screen and (max-width: 570px) {
    display: block;
  }
`;

const mapState = (state) => ({
  currentUser: state.users.currentUser,
});

export const Navbar = withRouter(({ history }) => {
  const navRef = useRef(null);

  const { currentUser } = useSelector(mapState);

  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      window.pageYOffset > 0
        ? navRef?.current?.classList.add("navbar_shadow")
        : navRef?.current?.classList.remove("navbar_shadow");
    });
    const abortController = new AbortController();
    return () => {
      abortController.abort();
    };
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

  const filteredLinks = currentUser
    ? currentUser?.category === "Admin"
      ? loggedInLinks.concat(navLinks)
      : loggedInLinks.concat(navLinks).filter((link) => link.name !== "Admin")
    : navLinks;

  //PROFILE MENU LOGIC
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
              {currentUser ? (
                <div
                  style={{
                    flexWrap: "nowrap",
                  }}
                  className="center"
                >
                  <Tooltip
                    title={`Hi ${currentUser?.displayName.split(" ")[0]}`}
                  >
                    <Avatar
                      style={{
                        maxHeight: "3rem",
                        maxWidth: "3rem",
                      }}
                      onClick={handleClick}
                    >
                      <img
                        src={currentUser?.photoURL}
                        alt={currentUser?.displayName?.charAt(0)}
                        style={{ maxHeight: "100%" }}
                      />
                    </Avatar>
                  </Tooltip>
                  <Menu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                    onClose={handleClose}
                  >
                    <Grid
                      container
                      direction="column"
                      style={{ padding: "0 1rem" }}
                      alignItems="flex-start"
                    >
                      <MenuItem>
                        <h3 style={{ marginBottom: "0.5rem" }}>{`Hi ${
                          currentUser?.displayName.split(" ")[0]
                        }`}</h3>
                      </MenuItem>
                      <Divider width="100%" />
                      <MenuItem onClick={handleClose}>
                        <StyledNavLink
                          to="/profile"
                          bold
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          My Profile
                        </StyledNavLink>
                      </MenuItem>
                      <Divider width="100%" />

                      <MenuItem onClick={handleClose}>
                        <StyledButton
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            padding: "0.5rem 0",
                          }}
                          bold
                          secondary
                          onClick={handleLogout}
                        >
                          Logout
                        </StyledButton>
                      </MenuItem>
                    </Grid>
                  </Menu>
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
          {/* <CollapseSearch /> */}
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

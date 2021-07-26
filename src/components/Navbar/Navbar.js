import React, { useRef, useContext } from "react";
import "./navbar.css";
import {
  StyledNavLink,
  StyledFab,
  SearchBar,
  Logo,
  AuthContext,
} from "../../components";
import { Avatar, Drawer, IconButton, Tooltip } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import styled from "styled-components";
import { DrawerLayout } from "../DrawerLayout";
import GoogleLogo from "../../assets/google.png";
import firebase from "../../config/firebase-config";
import { withRouter } from "react-router-dom";

const HamburgerIcon = styled.div`
  display: none;
  color: var(--primary);
  @media screen and (max-width: 570px) {
    display: block;
  }
`;

export const Navbar = withRouter(({ history }) => {
  const navLinks = [
    {
      name: "Blog",
      link: "/blog",
    },
    {
      name: "Market Place",
      link: "/market_place",
    },
    {
      name: "Job Portal",
      link: "/job_portal",
    },
    {
      name: "Tutorials",
      link: "/tutorials",
    },
  ];

  const navRef = useRef(null);

  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      window.pageYOffset > 0
        ? navRef?.current?.classList.add("navbar_shadow")
        : navRef?.current?.classList.remove("navbar_shadow");
    });
  }, []);

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { user } = useContext(AuthContext);

  const toggleDrawer = (event) => {
    setDrawerOpen(!drawerOpen);
  };

  const isUserPresentInDb = (user) => {
    let result = null;
    if (user) {
      result = firebase
        .database()
        .ref(`users`)
        .child(user?.uid)
        .get()
        .then((snap) => snap.val());
    }
    return result;
  };

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(async (response) => {
        if (!(await isUserPresentInDb(response.user))) {
          await history.push({
            pathname: "/signup",
            state: {
              user: {
                uid: response.user.uid,
                displayName: response.user.displayName,
                email: response.user.email,
                photoURL: response.user.photoURL,
              },
            },
          });
        }
      })
      .catch((err) => err);
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => res);
  };

  console.log("user", user);

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
              {navLinks.map((navlink) => {
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
                  <Tooltip title={`Hi ${user?.displayName?.split(" ")[0]}`}>
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
        <DrawerLayout />
      </Drawer>
    </>
  );
});

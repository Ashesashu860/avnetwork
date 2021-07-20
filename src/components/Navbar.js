import React, { useRef } from "react";
import "./navbar.css";
import { StyledNavLink, StyledFab, SearchBar, withAuth } from "../components";
import { Logo } from "./Logo";
import { mockUser } from "../mocks";
import { Avatar, Drawer, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import styled from "styled-components";
import { DrawerLayout } from "./DrawerLayout";
import GoogleLogo from "../assets/google.png";
import { googleProvider } from "../config/authMethods";
import socialMediaAuth from "../service/auth";

const HamburgerIcon = styled.div`
  display: none;
  color: var(--primary);
  @media screen and (max-width: 570px) {
    display: block;
  }
`;

export const Navbar = ({ user }) => {
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
  const searchBarRef = useRef(null);

  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      window.pageYOffset > 0
        ? navRef.current.classList.add("navbar_shadow")
        : navRef.current.classList.remove("navbar_shadow");
    });
  }, []);

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (event) => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogin = async () => {
    const res = await socialMediaAuth(googleProvider);
    console.log(res);
  };

  const handleLogout = () => {};

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
          <SearchBar ref={searchBarRef} className="search-bar" />
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
                  <Avatar
                    style={{
                      backgroundColor: "var(--primary)",
                      marginRight: "1rem",
                    }}
                  >
                    {mockUser.firstName.charAt(0)}
                  </Avatar>
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
                  {/* <StyledNavLink to="/signup">
                    <StyledFab
                      variant="extended"
                      bold
                      primary
                      style={{ height: "3rem" }}
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
                  </StyledNavLink> */}
                </>
              )}
            </div>
          </div>
        </nav>
        <nav
          style={{ position: "relative", marginTop: "-1px" }}
          className="sub-nav"
        >
          <SearchBar ref={searchBarRef} width="100%" />
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
};

//export const Navbar = withAuth(NavbarWithoutAuth);

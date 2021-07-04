import React, { useRef } from "react";
import "./navbar.css";
import { StyledNavLink, StyledFab } from "../components";
import { Logo } from "./Logo";
import { mockUser } from "../mocks";
import { Avatar, Drawer, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import styled from "styled-components";
import { DrawerLayout } from "./DrawerLayout";
import GoogleLogo from "../assets/google.png";

const HamburgerIcon = styled.div`
  display: none;
  color: var(--primary);
  @media screen and (max-width: 1000px) {
    display: block;
  }
`;

export const Navbar = () => {
  const navLinks = [
    {
      name: "Blog",
      link: "/blog",
    },
    //USED FOR REGISTERATION
    // {
    //   name: "Network",
    //   link: "/network",
    // },
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
    window.onscroll = () =>
      window.pageYOffset > 0
        ? navRef.current.classList.add("navbar_shadow")
        : navRef.current.classList.remove("navbar_shadow");
  }, []);

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (event) => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <nav ref={navRef}>
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

        <ul>
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
        <ul className="left-nav">
          {mockUser ? (
            <>
              <Avatar style={{ backgroundColor: "var(--primary)" }}>
                {mockUser.firstName.charAt(0)}
              </Avatar>
              <StyledNavLink to="/login" bold secondary>
                Sign Out
              </StyledNavLink>
            </>
          ) : (
            <>
              <StyledNavLink to="#">
                <StyledFab variant="extended" bold secondary>
                  <img
                    src={GoogleLogo}
                    alt="G"
                    style={{ maxWidth: "1.5rem", marginRight: "4px" }}
                  />
                  Login
                </StyledFab>
              </StyledNavLink>
              <StyledNavLink to="/signup">
                <StyledFab variant="extended" bold primary>
                  Register
                </StyledFab>
              </StyledNavLink>
            </>
          )}
        </ul>
        <HamburgerIcon>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </HamburgerIcon>
      </nav>
      <Drawer
        className="drawer"
        anchor={"right"}
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <DrawerLayout />
      </Drawer>
    </>
  );
};

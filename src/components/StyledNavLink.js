import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

export const StyledNavLink = styled(NavLink)`
  color: black;
  ${(props) => (props.primary || props.secondary ? buttonCss : "")};
  text-decoration: none;
  font-size: 0.9rem;
  ${(props) => (props.bold ? "font-weight: bold" : "")};
  height: 40px;
  user-select: none;
`;

export const buttonCss = css`
  ${(props) =>
    (props.secondary && "background-color: var(--secondary) !important") ||
    (props.primary && "background-color: var(--primary) !important")};
  padding: 0.6rem 1.2rem !important;
  border-radius: 0.3rem !important;
  ${(props) => props.primary && "color: white !important"};
`;

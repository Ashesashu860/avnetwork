import styled from "styled-components";
import { Fab } from "@material-ui/core";
import { buttonCss } from "../components/StyledNavLink";

export const StyledFab = styled(Fab)`
  font-weight: ${(props) => (props.bold ? "bold" : "normal")} !important;
  & span {
    ${(props) => !props.textCapitalize && "text-transform: none;"}
  }
  ${buttonCss};
  border-radius: 24px !important;
  max-height: 100%;
`;

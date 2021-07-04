import styled from "styled-components";
import { Button } from "@material-ui/core";
import { buttonCss } from "../components/StyledNavLink";

export const StyledButton = styled(Button)`
  font-weight: ${(props) => (props.bold ? "bold" : "normal")} !important;
  & span {
    ${(props) => !props.textCapitalize && "text-transform: none;"}
  }
  ${buttonCss};
`;

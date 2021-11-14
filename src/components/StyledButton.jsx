import styled from "styled-components";
import { Button } from "@material-ui/core";

export const StyledButton = styled(Button)`
  font-weight: ${(props) => (props.bold ? "bold" : "normal")} !important;
  border: 1px solid
    ${(props) => (props.secondary ? "var(--text-medium)" : "var(--primary)")} !important;
  border-radius: 6px !important;
  padding: 0.5rem 1.5rem !important;
  & span {
    ${(props) => !props.textCapitalize && "text-transform: none;"}
    color: ${(props) =>
      props.secondary ? "var(--text-medium)" : "var(--primary)"} !important;
    font-weight: bold;
  }

  @media screen and (max-width: 768px) {
    padding: 0.5rem 1rem !important;
  }
`;

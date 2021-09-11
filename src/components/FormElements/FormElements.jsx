import styled from "styled-components";
import { TextField, Select } from "@material-ui/core";

export const StyledTextBox = styled(TextField)`
  width: 40rem;
  @media screen and (max-width: 768px) {
    width: 30rem;
  }

  @media screen and (max-width: 570px) {
    width: 20rem;
  }

  & label.Mui-focused {
    color: var(--primary);
  }
  & .MuiInput-underline:after {
    border-bottom-color: var(--primary);
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: var(--primary);
    }
    &:hover fieldset {
      border-color: var(--primary);
    }
    &.Mui-focused fieldset {
      border-color: var(--primary);
    }
  }
`;

export const StyledForm = styled.form`
  & > *:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

export const StyledSelect = styled(Select)`
  border: 1px solid ${(props) => (props.error ? "#f44336" : "var(--primary)")};
`;

export const StyledImageContainer = styled.div`
  & > * {
    margin-bottom: 1rem;
    margin-right: 1rem;
  }
  margin-bottom: 1rem;
`;

import styled from "styled-components";

export const StyledInput = styled.input`
  outline: none;
  border: 0px solid;
  margin: 0 1rem;
  width: 100%;
  height: 100%;
  max-height: 100%;
  font-size: 1rem;
  background-color: transparent;
  &::placeholder {
    font-size: 0.9rem !important;
  }
`;

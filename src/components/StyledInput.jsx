import React from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  height: 3rem;
  border: 1px solid #bbb;
  border-radius: 4px;
  transition: 0.3s;
  padding: 0 0.5rem;
  font-size: 1rem;
  &:hover {
    border: 2px solid #bbb;
  }
  &:focus {
    outline: none !important;
    border: 2px solid var(--primary);
  }
  &::placeholder {
    color: #bbb;
  }
`;

export const StyledInput = () => {
  return <Input></Input>;
};

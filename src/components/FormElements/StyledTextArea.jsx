import React from "react";
import styled from "styled-components";

const StyledFieldset = styled.fieldset`
  border: 1px solid
    ${(props) =>
      props.error
        ? "#f44336"
        : props.color === "primary"
        ? "var(--primary)"
        : "#bbb"};
  border-radius: 4px;
  & textarea {
    padding: 0.5rem 1rem;
    width: 100%;
    height: 5rem;
    @media screen and (max-width: 768px) {
      width: 30rem;
    }

    @media screen and (max-width: 570px) {
      width: 20rem;
    }
    background: transparent;
    border: none;
    outline: none;

    &:focus {
      outline: none;
    }
  }
`;

const StyledLegend = styled.legend`
  font-size: 0.7rem;
  margin-left: 0.7rem;
  padding: 0.5rem;
  color: ${(props) =>
    props.error
      ? "#f44336"
      : props.color === "primary"
      ? "var(--primary)"
      : "#aaa"};
`;

export const ErrorText = styled.span`
  color: #f44336;
  font-size: 0.75rem;
  margin-left: 1rem;
  margin-top: 0.4rem;
`;

export const StyledTextArea = ({
  error,
  onChange,
  onBlur,
  name,
  title,
  color,
  className,
  style,
  value,
}) => {
  return (
    <div className={className} style={style}>
      <StyledFieldset error={!!error} color={color}>
        <StyledLegend error={!!error} color={color}>
          {title}
        </StyledLegend>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </StyledFieldset>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
};

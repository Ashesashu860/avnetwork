import React from "react";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import { StyledFab } from ".";
import { StyledInput } from "./StyledInput";

export const StyledInputFab = styled(StyledFab)`
  width: 3.5rem !important;
`;

const Container = styled(Grid)`
  height: 3.5rem;
  width: ${(props) => props.width || "26rem"} !important;
  border: 1px solid var(--secondary);
  border-radius: 28px;
  background-color: #eee;
  & * {
    height: 100%;
  }
  & svg {
    color: #fff;
    max-height: 100%;
    margin-left: 2px;
    margin: 0 0 -1px -1px;
  }
`;

export const InputWithButton = ({
  className,
  style,
  width,
  placeholder,
  icon,
  iconOnClick,
  inputValue,
  onChange,
}) => {
  return (
    <Container
      container
      alignItems="center"
      justify="flex-end"
      direction="row"
      wrap="nowrap"
      style={style}
      width={width}
      className={className}
    >
      <Grid container item>
        <StyledInput
          onChange={onChange}
          value={inputValue}
          placeholder={placeholder}
        />
      </Grid>
      <Grid container alignItems="center" style={{ width: "auto" }} item>
        <StyledInputFab
          disabled
          round
          style={{
            backgroundColor: "var(--primary)",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
          onClick={iconOnClick}
        >
          {icon}
        </StyledInputFab>
      </Grid>
    </Container>
  );
};

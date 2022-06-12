import { Chip, Grid } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const RowContainer = styled.div`
  margin-top: 1rem;
  scroll-snap-type: x mandatory;
  height: auto;
  width: auto;
  overflow: hidden;
`;

const RowSubContainer = styled(Grid)`
  scroll-snap-align: start;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FilterChips = ({
  selectedOption,
  options,
  onOptionChange,
  style,
}) => {
  return (
    <RowContainer>
      <RowSubContainer container spacing={1} wrap="nowrap">
        {options.map((option, index) => (
          <Grid item>
            <Chip
              key={option}
              style={
                option === selectedOption
                  ? { backgroundColor: "var(--primary)", color: "#fff" }
                  : {
                      backgroundColor: "var(--primaryLight)",
                    }
              }
              clickable
              onClick={() => onOptionChange(index)}
              label={option}
            />
          </Grid>
        ))}
      </RowSubContainer>
    </RowContainer>
  );
};

import { Chip } from "@material-ui/core";
import React from "react";
import { ShadowContainer } from "./ShadowContainer";

export const FilterChips = ({
  selectedOption,
  options,
  onOptionChange,
  style,
}) => {
  return (
    <ShadowContainer style={style}>
      {options.map((option, index) => (
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
      ))}
    </ShadowContainer>
  );
};

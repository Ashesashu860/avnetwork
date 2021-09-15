import React from "react";
import { IconButton } from "@material-ui/core";
import styled from "styled-components";

const Container = styled.div`
  padding: 0.5rem;
  border-radius: 0.5rem;
  justify-content: flex-start;
`;

const DetailContainer = styled.div`
  margin-left: 1rem;
  flex-direction: column;
  align-items: flex-start;
`;

export const ListItemWithPhoto = ({
  icon,
  title,
  value,
  style,
  iconBackgroundColor,
  backgroundColor,
}) => {
  return (
    <Container
      className="center"
      style={{ backgroundColor: backgroundColor, ...style }}
    >
      <IconButton
        disableRipple
        style={{ backgroundColor: iconBackgroundColor || "#ccc" }}
      >
        {icon}
      </IconButton>
      <DetailContainer className="center">
        <span style={{ fontWeight: "bold", marginBottom: "0.2rem" }}>
          {title}
        </span>
        <span>{value || `${title} not found`}</span>
      </DetailContainer>
    </Container>
  );
};

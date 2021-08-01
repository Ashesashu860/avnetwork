import React from "react";
import { Card, Grid, Divider } from "@material-ui/core";
import styled from "styled-components";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import CommentIcon from "@material-ui/icons/Comment";
import FavoriteIcon from "@material-ui/icons/Favorite";

const StyledCard = styled(Card)`
  position: relative;
  padding: 2rem 2.5rem;
  margin: 1rem 0.5rem;
  height: 16.5rem;
  min-width: 25rem;
  max-width: 25rem;
  border-radius: 16px !important;
  & > * {
    margin-bottom: 1rem;
  }
  & hr {
    margin-bottom: 1rem;
  }
  & h5 {
    color: var(--text-medium);
    font-weight: bold;
  }

  // &::before {
  //   position: absolute;
  //   content: "";
  //   border-radius: 50%;
  //   background-color: var(--primary);
  //   height: 100%;
  //   width: 100%;
  // }
`;

const StyledFooter = styled(Grid)`
  width: auto !important;

  & span {
    color: var(--tertiary);
    font-weight: bold;
  }

  & svg {
    height: 1.1rem;
    margin-top: 1px;
    color: var(--tertiary);
  }
`;

export const BlogCard = ({
  title,
  content,
  comments,
  likes,
  ratings,
  author,
  onClick,
  blogDate,
}) => {
  return (
    <StyledCard onClick={onClick}>
      <h3
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          maxWidth: "100%",
          width: "100%",
          height: "4.5rem",
          overflow: "hidden",
          color: "var(--text-medium)",
          fontSize: "0.85rem",
          textOverflow: "ellipsis",
          position: "relative",
          textAlign: "justify",
        }}
      >
        {content}
      </p>
      <Divider />
      <Grid container justify="space-between" alignItems="center">
        <h5>{`Author: ${author}`}</h5>
        <span
          style={{
            fontSize: "0.9rem",
            color: "var(--tertiary)",
            fontWeight: "bold",
          }}
        >
          {blogDate}
        </span>
      </Grid>
      <Grid container justify="space-between" alignItems="center">
        <Rating
          name="customized-empty"
          defaultValue={ratings}
          precision={0.5}
          //style={{ color: "var(--primary)" }}
          style={{ zIndex: "0" }}
          readOnly
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />
        <StyledFooter container direction="row">
          <FavoriteIcon />
          <span>{likes}</span>
          <CommentIcon />
          <span>{comments ? Object.values(comments).length : "0"}</span>
        </StyledFooter>
      </Grid>
    </StyledCard>
  );
};

import React from "react";
import { Card, Grid, Divider } from "@material-ui/core";
import styled from "styled-components";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import CommentIcon from "@material-ui/icons/Comment";
//import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const StyledCard = styled(Card)`
  position: relative;
  padding: 2rem;
  height: 16rem;
  width: 25rem;
  border-radius: 16px !important;
  & > * {
    margin-bottom: 0.5rem;
  }
  & hr {
    margin-bottom: 0.9rem;
  }
  & h5 {
    color: var(--tertiary);
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

const ShadedDiv = styled.div`
  background-image: linear-gradient(transparent, white);
  width: 100%;
  height: 2rem;
  position: absolute;
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
}) => {
  return (
    <StyledCard>
      <h3>{title}</h3>
      <p
        style={{
          maxWidth: "100%",
          width: "100%",
          height: "6rem",
          overflow: "hidden",
          color: "#777",
          fontSize: "0.9rem",
          textOverflow: "ellipsis",
          position: "relative",
        }}
      >
        {content}
      </p>
      <Divider />
      <h5>{`Author: ${author}`}</h5>
      <Grid container justify="space-between" alignItems="center">
        <Rating
          name="customized-empty"
          defaultValue={ratings}
          precision={0.5}
          //style={{ color: "var(--primary)" }}
          readOnly
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />
        <StyledFooter container direction="row">
          <FavoriteIcon />
          <span>{likes}</span>
          <CommentIcon />
          <span>{comments.length}</span>
        </StyledFooter>
      </Grid>
    </StyledCard>
  );
};

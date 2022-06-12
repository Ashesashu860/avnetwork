import React from "react";
import { Card, Grid } from "@material-ui/core";
import styled from "styled-components";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import CommentIcon from "@material-ui/icons/Comment";
import FavoriteIcon from "@material-ui/icons/Favorite";

// const StyledCard = styled(Card)`
//   position: relative;
//   padding: 2.5rem 3rem;
//   margin: 1rem 0.5rem;
//   height: 17rem;
//   min-width: 25rem;
//   max-width: 25rem;
//   border-radius: 16px !important;
//   & > * {
//     margin-bottom: 1rem;
//   }
//   & hr {
//     margin-bottom: 1rem;
//   }
//   & h5 {
//     color: var(--text-medium);
//     font-weight: bold;
//   }
// `;

const StyledCard = styled.div`
  position: relative;
  padding: 2.5rem 3rem;
  margin: 1rem 0.5rem;
  height: 15rem;
  min-width: 25rem;
  max-width: 25rem;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 8px !important;
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

const StyledParagraph = styled.p`
  max-width: 100%;
  width: 100%;
  height: 4.5rem;
  overflow: hidden;
  color: var(--text-medium);
  font-size: 0.85rem;
  text-verflow: ellipsis;
  position: relative;
  text-align: justify;
  margin-bottom: 0 !important;
  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: "";
    height: 2rem;
    width: 100%;
    background-image: linear-gradient(transparent, #fff);
  }
`;

const FooterContainer = styled.div`
  position: relative;
  margin-top: 1rem;
  & > *:not(:last-child) {
    margin-bottom: 0.5rem;
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
  category,
  style,
}) => {
  return (
    <StyledCard onClick={onClick} style={style}>
      <h3
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {title}
      </h3>
      <StyledParagraph>{content}</StyledParagraph>

      <FooterContainer>
        <Grid container justify="space-between" alignItems="center">
          <h5>{`${author}`}</h5>
          <h5>{`${category}`}</h5>
        </Grid>
        <Grid container justify="space-between" alignItems="center">
          <span
            style={{
              fontSize: "0.9rem",
              color: "var(--tertiary)",
              fontWeight: "bold",
            }}
          >
            {blogDate}
          </span>
          <StyledFooter container direction="row">
            <FavoriteIcon />
            <span>{likes}</span>
            <CommentIcon />
            <span>{comments || "0"}</span>
          </StyledFooter>
        </Grid>
        {/* <Grid container justify="space-between" alignItems="center">
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
            <span>{comments || "0"}</span>
          </StyledFooter>
        </Grid> */}
      </FooterContainer>
    </StyledCard>
  );
};

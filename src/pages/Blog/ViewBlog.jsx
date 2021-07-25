import React from "react";
import { InputWithButton, StyledFab } from "../../components";
import CommentIcon from "@material-ui/icons/Comment";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import styled from "styled-components";
import { Grid } from "@material-ui/core";

const ViewBlogContainer = styled.div`
  flex-direction: column;
  padding: 2rem 3rem;
  & > *:first-child {
    margin-top: 1rem;
  }
  & > *:not(:last-child) {
    margin-bottom: 2rem;
  }
  & > p {
    text-align: justify;
  }
`;

const StyledCard = styled.div`
  padding: 1.5rem 2.5rem;
  margin: 0.5rem 0;
  background-color: #eee;
  width: 100%;
  border-radius: 8px !important;
  & > *:not(:last-child) {
    margin-bottom: 0.6rem;
  }
`;

export const ViewBlog = (props) => {
  const { title, content, likes, comments, timestamp, author } =
    props.location.state;

  const blogDateTime =
    timestamp.getDate() +
    "/" +
    (timestamp.getMonth() + 1) +
    "/" +
    timestamp.getFullYear();

  React.useEffect(() => window.scrollTo(0, 0), []);

  const [comment, setComment] = React.useState("");
  const [like, setLike] = React.useState(false);

  const onCommentChange = (event) => setComment(event.target.value);
  const onCommentSubmit = (event) => null;

  const onLike = (event) => setLike(!like);

  return (
    <ViewBlogContainer className="wrapper center">
      <h1>{title}</h1>
      <p>{content}</p>
      <Grid container wrap="nowrap">
        <StyledFab
          onClick={onLike}
          primary={like}
          secondary={!like}
          style={{ marginRight: "1rem" }}
          round
        >
          {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </StyledFab>
        <InputWithButton
          inputValue={comment}
          onChange={onCommentChange}
          icon={<CommentIcon />}
          iconOnClick={onCommentSubmit}
          width="100%"
          placeholder="Comment..."
        />
      </Grid>
      <Grid container wrap="nowrap" style={{ marginBottom: "1rem" }}>
        <span style={{ marginRight: "1rem" }}>{likes} Likes</span>
        <span>{comments.length} Comments</span>
      </Grid>
      <Grid container wrap="nowrap">
        <span style={{ marginRight: "0.3rem" }}>{author}</span>
        <span>•</span>
        <span style={{ marginLeft: "0.3rem" }}>{blogDateTime}</span>
      </Grid>
      <h3>Comments</h3>
      <Grid container>
        {comments.map((comment) => {
          const commentDateTime =
            comment.timestamp.getDate() +
            "/" +
            (comment.timestamp.getMonth() + 1) +
            "/" +
            comment.timestamp.getFullYear();
          return (
            <StyledCard>
              <Grid
                container
                wrap="nowrap"
                style={{ justifyContent: "space-between" }}
              >
                <h5>{comment.userName}</h5>
                <span style={{ fontSize: "0.9rem" }}>{commentDateTime}</span>
              </Grid>
              <div
                style={{
                  // padding: "0.5rem",
                  // backgroundColor: "#bbb",
                  // borderRadius: "4px",
                  width: "100%",
                }}
              >
                {comment.value}
              </div>
            </StyledCard>
          );
        })}
      </Grid>
    </ViewBlogContainer>
  );
};

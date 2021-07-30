import React from "react";
import { InputWithButton, StyledFab } from "../../components";
import CommentIcon from "@material-ui/icons/Comment";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogWithIdAction,
  setAlertAction,
  addCommentInBlogAction,
} from "../../redux/actions";
import parse from "html-react-parser";
import { useParams, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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

const mapState = (state) => ({
  currentBlog: state.currentBlog,
  user: state.user,
});

export const ViewBlog = (props) => {
  const dispatch = useDispatch();
  const { currentBlog, user } = useSelector(mapState);
  const params = useParams();
  const history = useHistory();
  const blogId = props?.location?.state?.id || params.id;

  const getFormattedDate = (timestamp) => {
    const dateTime = new Date(timestamp);
    return `${dateTime.getDate()}/${
      dateTime.getMonth() + 1
    }/${dateTime.getFullYear()}`;
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    blogId && dispatch(getBlogWithIdAction(blogId));
  }, []);

  const [comment, setComment] = React.useState("");
  const [like, setLike] = React.useState(false);

  const onCommentChange = (event) => setComment(event.target.value);
  const onCommentSubmit = () => {
    if (!user) {
      dispatch(setAlertAction("Login to post a comment"));
      return;
    }
    if (!comment) {
      dispatch(setAlertAction("Unable to post empty comment"));
      return;
    }
    dispatch(
      addCommentInBlogAction(
        blogId,
        {
          id: uuidv4(),
          value: comment,
          userName: user.displayName,
        },
        history
      )
    );
    setComment("");
  };

  const onLike = (event) => setLike(!like);

  return (
    <ViewBlogContainer className="wrapper center">
      <h1>{currentBlog?.title}</h1>
      {currentBlog?.content && parse(currentBlog.content)}
      {user ? (
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
            iconOnClick={() => onCommentSubmit()}
            width="100%"
            placeholder="Comment..."
          />
        </Grid>
      ) : (
        <h4>Login to like or comment</h4>
      )}
      <Grid
        container
        justify="space-between"
        alignItems="center"
        style={{ marginBottom: "1rem" }}
      >
        <Grid wrap="nowrap" style={{ display: "inline-flex" }}>
          <span style={{ marginRight: "1rem" }}>
            {currentBlog?.likes} Likes
          </span>
          <span>
            {currentBlog?.comments ? currentBlog?.comments.length : "0"}{" "}
            Comments
          </span>
        </Grid>
        <Rating
          disabled
          precision={0.5}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />
      </Grid>
      <Grid container wrap="nowrap">
        <span style={{ marginRight: "0.3rem" }}>{currentBlog?.author}</span>
        <span>•</span>
        <span style={{ marginLeft: "0.3rem" }}>
          {getFormattedDate(currentBlog?.timestamp)}
        </span>
      </Grid>
      <h3>Comments</h3>
      <Grid container>
        {currentBlog?.comments ? (
          Object.values(currentBlog?.comments).map((comment) => {
            return (
              <StyledCard>
                <Grid
                  container
                  wrap="nowrap"
                  style={{ justifyContent: "space-between" }}
                >
                  <h5>{comment.userName}</h5>
                  <span style={{ fontSize: "0.9rem" }}>
                    {getFormattedDate(comment.timestamp)}
                  </span>
                </Grid>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  {comment.value}
                </div>
              </StyledCard>
            );
          })
        ) : (
          <p>Be the first one to comment.</p>
        )}
      </Grid>
    </ViewBlogContainer>
  );
};

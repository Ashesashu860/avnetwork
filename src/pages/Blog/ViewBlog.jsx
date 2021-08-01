import React from "react";
import { InputWithButton, StyledFab, Spinner } from "../../components";
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
  toggleCurrentBlogLikeAction,
  getCurrentBlogLikeAction,
  getCurrentBlogCommentsAction,
} from "../../redux/actions";
import parse from "html-react-parser";
import { useParams, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { CommentCard } from ".";

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

const mapState = (state) => ({
  currentBlog: state.currentBlog,
  user: state.user,
  isCurrentBlogLiked: state.isCurrentBlogLiked,
  isCurrentBlogLikeLoading: state.isCurrentBlogLikeLoading,
  currentBlogComments: state.currentBlogComments,
  isCurrentBlogCommentsLoading: state.isCurrentBlogCommentsLoading,
});

export const ViewBlog = (props) => {
  const dispatch = useDispatch();
  const {
    currentBlog,
    user,
    isCurrentBlogLiked,
    isCurrentBlogLikeLoading,
    currentBlogComments,
    isCurrentBlogCommentsLoading,
  } = useSelector(mapState);
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
    user?.uid && dispatch(getCurrentBlogLikeAction(blogId, user?.uid));
    blogId && dispatch(getCurrentBlogCommentsAction(blogId));
  }, []);

  const [comment, setComment] = React.useState("");

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
        user,
        {
          id: uuidv4(),
          comment,
        },
        history
      )
    );
    setComment("");
  };

  const onLike = (event) => {
    dispatch(toggleCurrentBlogLikeAction(currentBlog.id, user?.uid));
  };

  return (
    <ViewBlogContainer className="wrapper center">
      <h1>{currentBlog?.title}</h1>
      {currentBlog?.content && parse(currentBlog.content)}
      {user ? (
        <Grid container wrap="nowrap">
          <StyledFab
            onClick={onLike}
            primary={isCurrentBlogLiked}
            secondary={!isCurrentBlogLiked}
            style={{ marginRight: "1rem" }}
            disabled={isCurrentBlogLikeLoading}
            round
          >
            {isCurrentBlogLikeLoading ? (
              <Spinner color="#fff" />
            ) : isCurrentBlogLiked ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
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
          <span>{currentBlog?.comments || "0"} Comments</span>
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
        {isCurrentBlogCommentsLoading ? (
          <Spinner />
        ) : currentBlogComments ? (
          Object.values(currentBlogComments).map((comment) => {
            return (
              <CommentCard
                username={comment?.username}
                date={getFormattedDate(comment?.timestamp)}
                comment={comment?.comment}
                photoURL={comment?.photoURL}
              />
            );
          })
        ) : (
          <p>Be the first one to comment.</p>
        )}
        {/* {currentBlog?.comments ? (
          Object.values(currentBlog?.comments).map((comment) => {
            return (
              <CommentCard
                username={comment?.userName}
                date={getFormattedDate(comment?.timestamp)}
                comment={comment?.value}
                photoURL={comment?.photoURL}
              />
            );
          })
        ) : (
          <p>Be the first one to comment.</p>
        )} */}
      </Grid>
    </ViewBlogContainer>
  );
};

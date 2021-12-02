import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";
import { StyledFab, InputWithButton } from "../../components";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import ShareIcon from "@material-ui/icons/Share";
import CommentIcon from "@material-ui/icons/Comment";
import { setAlertAction } from "../../redux/actions";

const PlayerSubContainer = styled.div`
  margin: 1rem;
  & > *:not(last-child) {
    margin-bottom: 1rem;
  }
`;
const Player = styled.iframe`
  width: 100%;
  height: 60vmin;
  margin: auto;
  outline: 0;
  border: 0;
`;

const mapState = (state) => ({
  currentUser: state.users.currentUser,
});

export const WatchVideo = () => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();

  const params = useParams();

  const [comment, setComment] = React.useState("");

  const onCommentChange = (event) => setComment(event.target.value);
  const onCommentSubmit = () => {
    if (!currentUser) {
      dispatch(setAlertAction("Login to post a comment"));
      return;
    }
    if (!comment) {
      dispatch(setAlertAction("Unable to post empty comment"));
      return;
    }
    // dispatch(
    //   addCommentInBlogAction(
    //     blogId,
    //     currentUser,
    //     {
    //       id: uuidv4(),
    //       comment,
    //     },
    //     history
    //   )
    // );
    setComment("");
  };

  const onLike = (event) => {
    // dispatch(toggleCurrentBlogLikeAction(currentBlog.id, currentUser?.uid));
  };

  return (
    <div className="wrapper">
      <Player
        src={`https://www.youtube.com/embed/${params.id}?rel=0&autoplay=1`}
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        title="video"
      />
      <PlayerSubContainer>
        <Grid
          container
          wrap="nowrap"
          justify="space-between"
          alignItems="center"
        >
          {currentUser ? (
            <Grid
              container
              wrap="nowrap"
              justify="flex-end"
              className="blog_operations"
            >
              <StyledFab onClick={onLike} round>
                {/* {isCurrentBlogLikeLoading ? (
                    <Spinner color="#fff" />
                  ) : isCurrentBlogLiked ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )} */}
                <FavoriteBorderIcon />
              </StyledFab>
              <InputWithButton
                inputValue={comment}
                onChange={onCommentChange}
                icon={<CommentIcon />}
                iconOnClick={() => onCommentSubmit()}
                width="100%"
                placeholder="Comment..."
                className="hide_at_600"
              />
            </Grid>
          ) : (
            <h4>Login to like or comment</h4>
          )}
          <StyledFab
            primary
            round
            style={{ marginLeft: "1rem" }}
            onClick={() =>
              navigator.share({
                url: window.location.href,
              })
            }
          >
            <ShareIcon />
          </StyledFab>
        </Grid>
        {currentUser && (
          <InputWithButton
            inputValue={comment}
            onChange={onCommentChange}
            icon={<CommentIcon />}
            iconOnClick={() => onCommentSubmit()}
            width="100%"
            placeholder="Comment..."
            className="show_at_600"
          />
        )}
        <Grid
          container
          justify="space-between"
          alignItems="center"
          style={{ marginBottom: "1rem" }}
        >
          <Grid style={{ display: "inline-flex" }}>
            <span style={{ marginRight: "1rem" }}>
              {/* {currentBlog?.likes} Likes */}0 Likes
            </span>
            <span>
              {/* {currentBlog?.comments || "0"} Comments */}0 Comments
            </span>
          </Grid>
          <Rating
            disabled
            precision={0.5}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
          />
        </Grid>
      </PlayerSubContainer>
      {/* <Grid container wrap="nowrap">
        <span style={{ marginRight: "0.3rem" }}>{currentBlog?.author}</span>
        <span>•</span>
        <span style={{ marginLeft: "0.3rem" }}>
          {getFormattedDate(currentBlog?.timestamp)}
        </span>
      </Grid> */}
      <h3>Comments</h3>
      <Grid container>
        {/* {isCurrentBlogCommentsLoading ? (
          <Spinner />
        ) : currentBlogComments ? (
          Object.values(currentBlogComments)?.map((comment) => {
            return (
              <CommentCard
                key={comment?.photoURL}
                username={comment?.username}
                date={getFormattedDate(comment?.timestamp)}
                comment={comment?.comment}
                photoURL={comment?.photoURL}
              />
            );
          })
        ) : (
          <p>Be the first one to comment.</p>
        )} */}
      </Grid>
    </div>
  );
};

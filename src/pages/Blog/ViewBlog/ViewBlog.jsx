import React, { useEffect } from "react";
import { InputWithButton, StyledFab, Spinner } from "../../../components";
import CommentIcon from "@material-ui/icons/Comment";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ShareIcon from "@material-ui/icons/Share";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
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
  deleteBlogAction,
} from "../../../redux/actions";
import parse from "html-react-parser";
import { useParams, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { CommentCard } from "..";
import "./view-blog.css";
import { getFormattedDate } from "../BlogCreateModules";

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
  currentBlog: state.blogs.currentBlog,
  currentUser: state.users.currentUser,
  isCurrentBlogLiked: state.blogs.isCurrentBlogLiked,
  isCurrentBlogLikeLoading: state.blogs.isCurrentBlogLikeLoading,
  currentBlogComments: state.blogs.currentBlogComments,
  isCurrentBlogCommentsLoading: state.blogs.isCurrentBlogCommentsLoading,
});

export const ViewBlog = (props) => {
  const dispatch = useDispatch();
  const {
    currentBlog,
    currentUser,
    isCurrentBlogLiked,
    isCurrentBlogLikeLoading,
    currentBlogComments,
    isCurrentBlogCommentsLoading,
  } = useSelector(mapState);
  const params = useParams();
  const history = useHistory();

  const blogId = props?.location?.state?.id || params.id;

  React.useEffect(() => {
    window.scrollTo(0, 0);
    blogId && dispatch(getBlogWithIdAction(blogId));
    currentUser?.uid &&
      dispatch(getCurrentBlogLikeAction(blogId, currentUser?.uid));
    blogId && dispatch(getCurrentBlogCommentsAction(blogId));
    const abortController = new AbortController();
    return () => {
      abortController.abort();
    };
  }, []);

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
    dispatch(
      addCommentInBlogAction(
        blogId,
        currentUser,
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
    dispatch(toggleCurrentBlogLikeAction(currentBlog.id, currentUser?.uid));
  };

  //APPEND ADS IN BLOG
  useEffect(() => {
    const ad2 = document.createElement("div");
    ad2.innerText = "Place your ad here 1";
    ad2.classList.add("ad_square");
    ad2.id = "blog_ad_2";

    const ad3 = document.createElement("div");
    ad3.innerText = "Place your ad here 2";
    ad3.classList.add("ad_square");
    ad3.id = "blog_ad_3";

    if (currentBlog?.content) {
      const allParagraphs = document
        .getElementsByClassName("blog-content")[0]
        .getElementsByTagName("p");
      const noOfParagraphs = allParagraphs.length;
      const oneThirdParagraph = Math.floor(noOfParagraphs / 3);
      console.log(
        "noOfParagraphs",
        noOfParagraphs,
        "oneThirdParagraph",
        oneThirdParagraph
      );
      if (allParagraphs[oneThirdParagraph])
        if (!document.getElementById("blog_ad_2"))
          document
            .getElementsByClassName("blog-content")[0]
            .insertBefore(ad2, allParagraphs[oneThirdParagraph]);
      if (allParagraphs[oneThirdParagraph * 2])
        if (!document.getElementById("blog_ad_3"))
          document
            .getElementsByClassName("blog-content")[0]
            .insertBefore(ad3, allParagraphs[oneThirdParagraph * 2]);
    }

    const abortController = new AbortController();
    return () => {
      abortController.abort();
    };
  }, [currentBlog?.content]);

  return (
    <ViewBlogContainer className="wrapper center">
      <h1>{currentBlog?.title}</h1>
      <div
        id="blog_ad_1"
        className="center"
        style={{
          backgroundColor: "#ddd",
          minWidth: "100%",
          minHeight: "7rem",
          maxHeight: "7rem",
        }}
      >
        Place your ad here
      </div>
      <div className="blog-content">
        {currentBlog?.content && parse(currentBlog.content)}
      </div>
      <div
        id="blog_ad_4"
        className="center"
        style={{
          backgroundColor: "#ddd",
          minWidth: "100%",
          minHeight: "8rem",
          maxHeight: "8rem",
        }}
      >
        Place your ad here
      </div>
      <Grid container wrap="nowrap" justify="space-between" alignItems="center">
        {currentUser ? (
          <Grid
            container
            wrap="nowrap"
            justify="flex-end"
            className="blog_operations"
          >
            <StyledFab
              onClick={onLike}
              primary={isCurrentBlogLiked}
              secondary={!isCurrentBlogLiked}
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
              className="hide_at_600"
            />
            {currentBlog?.userId === currentUser?.uid && (
              <StyledFab
                primary
                round
                onClick={() =>
                  history.push({
                    pathname: "/blog-create",
                    state: { currentBlog },
                  })
                }
              >
                <EditIcon />
              </StyledFab>
            )}
            {currentBlog?.userId === currentUser?.uid && (
              <StyledFab
                primary
                round
                onClick={() =>
                  dispatch(deleteBlogAction(currentBlog.id, history))
                }
              >
                <DeleteIcon />
              </StyledFab>
            )}
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
        )}
      </Grid>
    </ViewBlogContainer>
  );
};

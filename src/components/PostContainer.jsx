import React from "react";
import styled from "styled-components";
import { Grid, Avatar } from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useSelector, useDispatch } from "react-redux";
import { InputWithButton } from "./InputWithButton";
import CommentIcon from "@material-ui/icons/Comment";
import { CommentCard } from "../pages/Blog";
import { getFormattedDate } from "../pages/Blog/BlogCreateModules";
import {
  getQueryCommentsAction,
  postAQueryCommentAction,
  setAlertAction,
} from "../redux/actions";
import { LoaderIcon } from "./LoaderIcon";

const Accordion = withStyles({
  root: {
    marginTop: "1rem",
    borderRadius: "0.4rem",
    boxShadow: "none",
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      marginTop: "1rem",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "none",
    marginBottom: -1,
    padding: "0",
    minHeight: "auto",
    "& > div": {
      margin: "0 1rem",
    },
    "&$expanded": {
      margin: 0,
      minHeight: "auto",
      "& > div": {
        margin: "0 1rem",
      },
    },
  },
  content: {
    "&$expanded": {
      minHeight: "initial",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const StyledCard = styled.div`
  padding: 1.5rem;
  margin: 0.5rem 0;
  background-color: #eee;
  width: 100%;
  border-radius: 8px !important;
`;

const mapState = (state) => ({
  currentUser: state.users.currentUser,
});

export const PostContainer = ({
  query,
  queryComments,
  areQueryCommentsLoading,
}) => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector(mapState);

  const [comment, setComment] = React.useState("");

  const onCommentChange = (event) => setComment(event.target.value);
  const onCommentSubmit = (event) => {
    if (comment) {
      dispatch(postAQueryCommentAction(query.id, comment, currentUser));
      setComment("");
    } else {
      dispatch(setAlertAction("Please type a comment to post"));
    }
  };

  //Accordion
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandChange = (event) => {
    if (!queryComments) {
      dispatch(getQueryCommentsAction(query?.id));
    }
    setExpanded(!expanded);
  };

  return (
    <StyledCard>
      <Grid container wrap="nowrap">
        <Avatar
          style={{
            maxHeight: "2.2rem",
            maxWidth: "2.2rem",
            alignSelf: "flex-start",
            marginRight: "1rem",
          }}
        >
          <img
            src={query.photoURL}
            alt={query.username?.charAt(0)}
            style={{ maxHeight: "100%" }}
          />
        </Avatar>
        <Grid container>
          <Grid
            container
            wrap="nowrap"
            style={{ justifyContent: "space-between" }}
          >
            <h5>{query.username}</h5>
            <span style={{ fontSize: "0.9rem" }}>
              {getFormattedDate(query.timestamp)}
            </span>
          </Grid>
          <div
            style={{
              width: "100%",
              marginTop: "0.5rem",
            }}
          >
            {query.queryText}
          </div>
        </Grid>
      </Grid>
      <Accordion expanded={expanded} onChange={handleExpandChange}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <p style={{ color: "#666" }}>Comments</p>
        </AccordionSummary>
        <AccordionDetails>
          {areQueryCommentsLoading ? (
            <LoaderIcon />
          ) : queryComments?.length > 0 ? (
            <Grid container direction="column">
              {queryComments?.map((comment) => {
                return (
                  <CommentCard
                    key={comment?.photoURL}
                    username={comment?.username}
                    comment={comment?.queryComment}
                    photoURL={comment?.photoURL}
                    date={getFormattedDate(comment?.timestamp)}
                  />
                );
              })}
            </Grid>
          ) : (
            <p>No Comments</p>
          )}
        </AccordionDetails>
      </Accordion>
      {currentUser && (
        <InputWithButton
          inputValue={comment}
          onChange={onCommentChange}
          icon={<CommentIcon />}
          iconOnClick={onCommentSubmit}
          width="100%"
          placeholder="Comment..."
          style={{ marginTop: "1rem", backgroundColor: "#ddd" }}
        />
      )}
    </StyledCard>
  );
};

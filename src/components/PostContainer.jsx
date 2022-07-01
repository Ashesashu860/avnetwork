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

export const PostContainer = ({ username, date, queryText, photoURL }) => {
  const { currentUser } = useSelector(mapState);

  const [comment, setComment] = React.useState("");

  const onCommentChange = (event) => setComment(event.target.value);
  const onCommentSubmit = () => null;
  console.log("currentUser", currentUser);
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
            src={photoURL}
            alt={username?.charAt(0)}
            style={{ maxHeight: "100%" }}
          />
        </Avatar>
        <Grid container>
          <Grid
            container
            wrap="nowrap"
            style={{ justifyContent: "space-between" }}
          >
            <h5>{username}</h5>
            <span style={{ fontSize: "0.9rem" }}>{date}</span>
          </Grid>
          <div
            style={{
              width: "100%",
              marginTop: "0.5rem",
            }}
          >
            {queryText}
          </div>
        </Grid>
      </Grid>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <p style={{ color: "#666" }}>Comments</p>
        </AccordionSummary>
        <AccordionDetails>
          <CommentCard
            key={comment?.photoURL}
            username={comment?.username}
            date={date}
            comment={comment?.comment}
            photoURL={comment?.photoURL}
          />
        </AccordionDetails>
      </Accordion>
      {currentUser && (
        <InputWithButton
          inputValue={comment}
          onChange={onCommentChange}
          icon={<CommentIcon />}
          iconOnClick={() => onCommentSubmit()}
          width="100%"
          placeholder="Comment..."
          style={{ marginTop: "1rem", backgroundColor: "#ddd" }}
        />
      )}
    </StyledCard>
  );
};

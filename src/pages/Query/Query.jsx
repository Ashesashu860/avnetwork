import {
  Card,
  Dialog,
  FormControl,
  Grid,
  InputLabel,
  Select,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { LoaderIcon, StyledFab, StyledTextArea } from "../../components";
import {
  getAllQueriesForCurrentUserAction,
  postQueryAction,
} from "../../redux/actions/query_actions";
import { CommentCard } from "../Blog";
import { blogCategories } from "../masterData";
import { v4 as uuidv4 } from "uuid";
import "./query.css";
import { getFormattedDate } from "../Blog/BlogCreateModules";

const QueryTextArea = styled(StyledTextArea)`
  margin-top: 1rem;
`;

const mapState = (state) => ({
  currentUser: state?.users?.currentUser,
  areQueriesLoading: state.queries.areQueriesLoading,
  allQueries: state.queries.allQueries,
});

const initialQuery = {
  queryText: "",
  queryCategory: "",
};

export const Query = () => {
  const [query, setQuery] = React.useState(initialQuery);

  const dispatch = useDispatch();
  const { currentUser, areQueriesLoading, allQueries } = useSelector(mapState);

  const onChange = (event) => {
    setQuery({
      ...query,
      [event.target.name]: event.target.value,
    });
  };

  const onPostQueryClick = () => {
    dispatch(
      postQueryAction(
        {
          ...query,
          id: uuidv4(),
        },
        currentUser
      )
    );
    setQuery(initialQuery);
  };

  React.useEffect(() => {
    dispatch(getAllQueriesForCurrentUserAction(currentUser?.uid));
  }, []);

  return (
    <div className="wrapper container">
      <Card className="post_container">
        <QueryTextArea
          title="Post your query"
          label="Post your query"
          onChange={onChange}
          name="queryText"
          value={query.queryText}
          placeholder="Write a query..."
          plain
        />
        <Grid
          container
          wrap="nowrap"
          justifyContent="space-between"
          style={{ marginTop: "1rem", marginBottom: "0.5rem" }}
        >
          <FormControl>
            <InputLabel>Category</InputLabel>
            <Select
              native
              name="queryCategory"
              value={query.queryCategory}
              onChange={onChange}
              label="Category"
            >
              <option value={""}></option>
              {blogCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </FormControl>
          <StyledFab
            disabled={!query?.queryText || !query?.queryCategory}
            variant="extended"
            bold
            primary={(query?.queryText && query?.queryCategory) || false}
            onClick={onPostQueryClick}
          >
            Post
          </StyledFab>
        </Grid>
      </Card>
      <Card className="post_container">
        {areQueriesLoading ? (
          <LoaderIcon />
        ) : allQueries ? (
          allQueries?.map((query) => {
            return (
              <CommentCard
                key={query?.photoURL}
                username={query?.username}
                date={getFormattedDate(query?.timestamp)}
                comment={query?.queryText}
                photoURL={query?.photoURL}
              />
            );
          })
        ) : (
          <h3>No Queries</h3>
        )}
      </Card>
    </div>
  );
};

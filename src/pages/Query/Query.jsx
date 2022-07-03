import { Card, FormControl, Grid, InputLabel, Select } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  LoaderIcon,
  StyledFab,
  StyledTextArea,
  PostContainer,
} from "../../components";
import {
  getAllQueriesForCurrentUserAction,
  postQueryAction,
} from "../../redux/actions/query_actions";
import { blogCategories } from "../masterData";
import { v4 as uuidv4 } from "uuid";
import "./query.css";
import { setDialogBoxPropsAction } from "../../redux/actions";
import { useHistory } from "react-router-dom";

const QueryTextArea = styled(StyledTextArea)`
  margin-top: 1rem;
`;

const mapState = (state) => ({
  currentUser: state?.users?.currentUser,
  areQueriesLoading: state.queries.areQueriesLoading,
  allQueries: state.queries.allQueries,
  queryComments: state.queries.queryComments,
  areQueryCommentsLoading: state.queries.areQueryCommentsLoading,
});

const initialQuery = {
  queryText: "",
  queryCategory: "",
};

export const Query = () => {
  const [query, setQuery] = React.useState(initialQuery);
  const history = useHistory();

  const dispatch = useDispatch();
  const {
    currentUser,
    areQueriesLoading,
    allQueries,
    queryComments,
    areQueryCommentsLoading,
  } = useSelector(mapState);

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
    if (!currentUser) {
      history.push("/");
      dispatch(
        setDialogBoxPropsAction(
          "Signup or login to to see all the queries",
          {
            title: "OK",
            onButtonClick: (event) => {},
          },
          true
        )
      );
    } else dispatch(getAllQueriesForCurrentUserAction(currentUser?.uid));
  }, []);

  return (
    <>
      {currentUser && (
        <div className="wrapper container">
          <Card className="post_container">
            <QueryTextArea
              title="Query"
              label="Query"
              onChange={onChange}
              name="queryText"
              value={query.queryText}
              placeholder="Write a query..."
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
              allQueries
                .sort((a, b) => b.timestamp - a.timestamp)
                ?.map((query) => {
                  return (
                    <PostContainer
                      key={query?.id}
                      query={query}
                      queryComments={queryComments?.[query?.id]}
                      areQueryCommentsLoading={areQueryCommentsLoading}
                    />
                  );
                })
            ) : (
              <h3>No Queries</h3>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

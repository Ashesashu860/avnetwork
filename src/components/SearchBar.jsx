import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Fab, Grid } from "@material-ui/core";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const SearchContainer = styled.div`
  width: 21rem;
  height: 2.7rem;
  border: 1px solid var(--secondary);
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end !important;
  background-color: #fff;
  //filter: drop-shadow(1px 1px 4px #ddd);
`;

const StyledMenu = styled(Menu)`
  & ul {
    display: flex;
    flex-direction: column;
  }
`;

const StyledInput = styled.input`
  height: 2.4rem;
  outline: none;
  border: 0px solid;
  margin-right: 0.3rem;
  width: 100%;
`;

export const SearchBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCateory, setSelectedCateory] = React.useState("Category");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => setSelectedCateory(event.target.value);

  return (
    <SearchContainer>
      <Grid
        container
        alignItems="center"
        justify="flex-end"
        direction="row"
        wrap="nowrap"
      >
        <Grid item>
          <StyledInput placeholder="Search Market Place" />
        </Grid>
        <Grid item>
          <Button
            aria-haspopup="true"
            onClick={handleClick}
            style={{
              backgroundColor: "#eee",
              borderRadius: "6px 0 0 6px",
              marginTop: "-1px",
              marginRight: "-2px",
              height: "37px",
              fontSize: "0.7rem",
              fontWeight: "bold",
              padding: "0 0.8rem",
            }}
          >
            {selectedCateory}
            <ExpandMoreIcon />
          </Button>
          <StyledMenu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onChange={handleChange}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </StyledMenu>
        </Grid>
        <Grid item>
          <Fab
            disabled
            style={{
              backgroundColor: "var(--primary)",
              maxHeight: "2.3rem",
              maxWidth: "2.4rem",
              margin: "0.1rem",
              borderRadius: "0 6px 6px 0",
            }}
          >
            <SearchIcon
              style={{ color: "#fff", maxHeight: "100%", marginLeft: "2px" }}
            />
          </Fab>
        </Grid>
      </Grid>
    </SearchContainer>
  );
};

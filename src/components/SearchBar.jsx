import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { StyledFab } from ".";
import { StyledInput } from "./StyledInput";
import { marketPlaceProductCategories } from "../pages/masterData";

export const StyledSearchFab = styled(StyledFab)`
  width: 3.5rem !important;
`;

const SearchContainer = styled(Grid)`
  height: 3.5rem;
  width: ${(props) => props.width || "26rem"} !important;
  border: 1px solid var(--secondary);
  border-radius: 28px;
  background-color: #eee;
  & * {
    height: 100%;
  }
`;

const StyledMenu = styled(Menu)`
  & ul {
    display: flex;
    flex-direction: column;
  }

  height: 100%;
`;

export const SearchBar = ({ className, style, width }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCateoryIndex, setSelectedCateoryIndex] = React.useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryChange = (event, index) => {
    setSelectedCateoryIndex(index);
    setAnchorEl(null);
  };

  return (
    <SearchContainer
      container
      alignItems="center"
      justify="flex-end"
      direction="row"
      wrap="nowrap"
      style={style}
      width={width}
      className={className}
    >
      <Grid container item>
        <StyledInput placeholder="Search Market Place" />
      </Grid>
      <Grid container alignItems="center" style={{ width: "auto" }} item>
        <Button
          aria-haspopup="true"
          onClick={handleClick}
          style={{
            backgroundColor: "#eee",
            borderRadius: "6px 0 0 6px",
            marginTop: "1px",
            height: "37px",
            fontSize: "0.7rem",
            fontWeight: "bold",
            padding: "0 0.8rem",
          }}
        >
          {marketPlaceProductCategories[selectedCateoryIndex]}
          <ExpandMoreIcon />
        </Button>
        <StyledMenu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {marketPlaceProductCategories.map((category, index) => (
            <MenuItem
              key={category}
              disabled={index === 0}
              selected={index === selectedCateoryIndex}
              onClick={(event) => handleCategoryChange(event, index)}
            >
              {category}
            </MenuItem>
          ))}
        </StyledMenu>
      </Grid>
      <Grid container alignItems="center" style={{ width: "auto" }} item>
        <StyledSearchFab
          disabled
          round
          style={{
            backgroundColor: "var(--primary)",
            maxWidth: "100%",
            maxHeight: "100%",
            // borderRadius: "0 6px 6px 0",
          }}
        >
          <SearchIcon
            style={{ color: "#fff", maxHeight: "100%", marginLeft: "2px" }}
          />
        </StyledSearchFab>
      </Grid>
    </SearchContainer>
  );
};

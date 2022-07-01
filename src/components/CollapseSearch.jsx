import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";

const SearchContainer = styled.div`
  position: relative;
  height: 24px;
  & .input {
    background-color: #fff;
    border: 1px solid;
    font-size: 18px;
    padding: 8px;
    height: 24px;
    width: 24px;
    transition: width 0.3s ease;
    &:focus {
      outline: none;
    }
  }
  &.active .input {
    width: 200px;
  }
`;

const SearchButton = styled.button`
  background-color: #fff;
  border: 0;
  cursor: pointer;
  font-size: 24px;
  position: absolute;
  top: 0;
  left: 0;
  height: 24px;
  width: 24px;
  transition: transform 0.3s ease;
  &:focus {
    outline: none;
  }
`;

export const CollapseSearch = () => {
  const inputRef = React.useRef();
  const [toggle, setToggle] = React.useState(false);
  return (
    <SearchContainer className={toggle && "active"}>
      <input ref={inputRef} type="text" class="input" placeholder="Search..." />
      <SearchButton
        onClick={(event) => {
          setToggle(!toggle);
          inputRef.current.focus();
        }}
      >
        <SearchIcon />
      </SearchButton>
    </SearchContainer>
  );
};

import React from "react";
import { StyledTopBar } from "./TopBar-styles";

const TopBar = (props) => {
  return (
    <StyledTopBar id="topbar">
      <h3>{props.text}</h3>
    </StyledTopBar>
  );
};

export default TopBar;

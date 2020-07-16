import React from "react";
import { StyledTopBar } from "./TopBar-styles";

const TopBar = (props) => {
  return (
    <StyledTopBar id="topbar">
      <h3>{props.text}</h3>
      <p>Filtered:</p>
    </StyledTopBar>
  );
};

export default TopBar;

import React from "react";
import * as Styled from "./TopBar.styles";

const TopBar = (props) => {
  return (
    <Styled.TopBar id="topbar">
      <h3>{props.text}</h3>
    </Styled.TopBar>
  );
};

export default TopBar;

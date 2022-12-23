import React, { useState } from "react";
import * as Styled from "./NavItems.styles";

export const NavItems = ({ children }) => {
  const [drawerOn, setDrawerOn] = useState(false);

  const toggleDrawer = () => setDrawerOn(!drawerOn);

  return (
    <>
      <Styled.DrawerToggler onClick={toggleDrawer}>
        <i className={`fas fa-${drawerOn ? "times" : "bars"}`}></i>
      </Styled.DrawerToggler>
      <Styled.NavItems open={drawerOn}>{children}</Styled.NavItems>
    </>
  );
};

export default NavItems;

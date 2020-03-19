import React from "react";
import NavBar from "../../components/NavBar";
import TopBar from "../../components/TopBar";
import FilterMenu from "../../components/FilterMenu";
import ShoesList from "../../components/ShoesList";
import { StyledMen } from "./Men-styles";

const Men = () => {
  return (
    <StyledMen>
      <NavBar id="navbar" />
      <TopBar shoesFor="Men's" />
      <FilterMenu gender="Male" />
      <ShoesList />
    </StyledMen>
  );
};

export default Men;

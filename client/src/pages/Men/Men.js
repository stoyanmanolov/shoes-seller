import React from "react";
import NavBar from "../../components/NavBar";
import TopBar from "../../components/TopBar";
import FilterMenu from "../../components/FilterMenu";

const Men = () => {
  return (
    <>
      <NavBar />
      <TopBar shoesFor="Men's" />
      <FilterMenu gender="Male" />
    </>
  );
};

export default Men;

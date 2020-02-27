import React from "react";
import NavBar from "../../components/NavBar";
import TopBar from "../../components/TopBar";
import FilterMenu from "../../components/FilterMenu";

const Women = () => {
  return (
    <>
      <NavBar />
      <TopBar shoesFor="Women's" />
      <FilterMenu gender="Female" />
    </>
  );
};

export default Women;

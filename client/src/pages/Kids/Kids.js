import React from "react";
import NavBar from "../../components/NavBar";
import TopBar from "../../components/TopBar";
import FilterMenu from "../../components/FilterMenu";

const Kids = () => {
  return (
    <>
      <NavBar />
      <TopBar shoesFor="Kids'" />
      <FilterMenu forKids={true} />
    </>
  );
};

export default Kids;

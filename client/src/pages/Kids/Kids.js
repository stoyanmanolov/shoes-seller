import React from "react";
import NavBar from "../../components/NavBar";
import TopBar from "../../components/TopBar";
import FilterMenu from "../../components/FilterMenu";
import ShoesList from "../../components/ShoesList";
import { ProductsPage } from "../shared-styles/ProductsPage-styles";

const Kids = () => {
  return (
    <ProductsPage>
      <NavBar />
      <TopBar shoesFor="Kids'" />
      <FilterMenu forKids={true} />
      <ShoesList />
    </ProductsPage>
  );
};

export default Kids;

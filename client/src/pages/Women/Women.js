import React from "react";
import NavBar from "../../components/NavBar";
import TopBar from "../../components/TopBar";
import FilterMenu from "../../components/FilterMenu";
import ShoesList from "../../components/ShoesList";
import { ProductsPage } from "../shared-styles/ProductsPage-styles";

const Women = () => {
  return (
    <ProductsPage>
      <NavBar />
      <TopBar shoesFor="Women's" />
      <FilterMenu gender="Female" />
      <ShoesList />
    </ProductsPage>
  );
};

export default Women;

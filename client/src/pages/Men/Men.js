import React from "react";
import NavBar from "../../components/NavBar";
import TopBar from "../../components/TopBar";
import FilterMenu from "../../components/FilterMenu";
import ShoesList from "../../components/ShoesList";
import { ProductsPage } from "../shared-styles/ProductsPage.styles";

const Men = () => {
  return (
    <ProductsPage>
      <NavBar />
      <TopBar text="Men's shoes" />
      <FilterMenu gender="Male" />
      <ShoesList gender="Male" />
    </ProductsPage>
  );
};

export default Men;

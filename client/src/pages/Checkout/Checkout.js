import React from "react";
import NavBar from "../../components/NavBar";
import TopBar from "../../components/TopBar";
import Order from "../../components/Order";

const Checkout = () => {
  return (
    <>
      <NavBar />
      <TopBar text="Checkout" />
      <Order />
    </>
  );
};

export default Checkout;

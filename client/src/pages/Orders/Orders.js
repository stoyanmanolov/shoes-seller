import React from "react";
import NavBar from "../../components/NavBar";
import OrdersList from "../../components/OrdersList";

const Orders = () => {
  return (
    <>
      <NavBar id="navbar" />
      <OrdersList />
    </>
  );
};

export default Orders;

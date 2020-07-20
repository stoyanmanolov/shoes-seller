import React from "react";
import NavBar from "../../components/NavBar";
import TopBar from "../../components/TopBar";
import CartList from "../../components/CartList";

const Cart = () => {
  return (
    <>
      <NavBar />
      <TopBar text="Your cart" />
      <CartList />
    </>
  );
};

export default Cart;

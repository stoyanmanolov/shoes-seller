import React from "react";
import NavBar from "../../components/NavBar";
import TopBar from "../../components/TopBar";
import Cart from "../../components/Cart";

const Home = () => {
  return (
    <>
      <NavBar />
      <TopBar text="Your cart" />
      <Cart />
    </>
  );
};

export default Home;

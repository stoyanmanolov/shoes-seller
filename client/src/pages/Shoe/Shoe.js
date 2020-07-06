import React from "react";
import NavBar from "../../components/NavBar";
import ShoeDetails from "../../components/ShoeDetails";

const Shoe = (props) => {
  return (
    <>
      <NavBar />
      <ShoeDetails id={props.match.params.id} />
    </>
  );
};

export default Shoe;

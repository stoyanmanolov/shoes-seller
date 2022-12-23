import React from "react";
import NavBar from "../../components/NavBar";

const DeletedShoe = (props) => {
  return (
    <>
      <NavBar />
      <h3 style={{ textAlign: "center" }}>
        Shoe {props.match.params.id} deleted successfully.
      </h3>
    </>
  );
};

export default DeletedShoe;

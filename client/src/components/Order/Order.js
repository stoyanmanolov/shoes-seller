import React, { useState } from "react";
import * as Styled from "./Order.styles";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";
import Error from "../Error";
import { useSelector } from "react-redux";

export const Order = () => {
  const [orderId, setOrderId] = useState();
  const [error, setError] = useState();
  const cart = useSelector((state) => state.orders.cart);

  if (error) {
    return <Error status={error.status} message={error.statusText} />;
  } else if (orderId) {
    return <Styled.Heading>Order {orderId} succesfully made!</Styled.Heading>;
  } else if (cart.length === 0) {
    return <Styled.Heading>Your cart is empty</Styled.Heading>;
  } else {
    return (
      <Styled.Order>
        <OrderList />
        <OrderForm setOrderId={setOrderId} setError={setError} />
      </Styled.Order>
    );
  }
};

export default Order;

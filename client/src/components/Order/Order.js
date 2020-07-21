import React from "react";
import { StyledOrder } from "./Order-styles";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";

export class Order extends React.Component {
  render() {
    return (
      <StyledOrder id="order">
        <OrderList />
        <OrderForm />
      </StyledOrder>
    );
  }
}

export default Order;

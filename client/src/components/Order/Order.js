import React from "react";
import { StyledOrder } from "./Order-styles";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";
import { connect } from "react-redux";

export class Order extends React.Component {
  render() {
    return (
      <StyledOrder id="order">
        <OrderList cart={this.props.cart} totalPrice={this.props.totalPrice} />
        <OrderForm />
      </StyledOrder>
    );
  }
}

export default connect(({ orders }) => ({
  cart: orders.cart,
  totalPrice: orders.totalPrice,
}))(Order);

import React from "react";
import { StyledOrder, OrderDetails } from "./Order-styles";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";
import { connect } from "react-redux";
import Error from "../Error";

export class Order extends React.Component {
  state = { orderDetails: null, orderError: null };

  getOrder = (order) => {
    this.setState({ orderDetails: order });
  };

  getError = (error) => {
    this.setState({ orderError: error });
  };

  componentWillUnmount = () => {
    this.setState({ orderDetails: null, orderError: null });
  };

  render() {
    if (this.props.cart.length === 0) {
      return (
        <OrderDetails id="order-cart-empty">
          <h3>Your cart is empty</h3>
        </OrderDetails>
      );
    } else if (this.state.orderDetails) {
      return (
        <OrderDetails id="order-successful">
          <h3>Order succesfully made!</h3>
          {Object.keys(this.state.orderDetails).map((key) => {
            if (key === "cart" || key === "_id" || key === "__v") {
              return null;
            }
            return (
              <p key={key}>
                {key.toUpperCase()}: {this.state.orderDetails[key]}
              </p>
            );
          })}
        </OrderDetails>
      );
    } else if (this.state.orderError) {
      return (
        <Error
          id="order-error"
          status={this.state.orderError.status}
          message={this.state.orderError.statusText}
        />
      );
    }
    return (
      <StyledOrder id="order">
        <OrderList cart={this.props.cart} totalPrice={this.props.totalPrice} />
        <OrderForm
          cart={this.props.cart}
          totalPrice={this.props.totalPrice}
          getOrder={this.getOrder}
          getError={this.getError}
        />
      </StyledOrder>
    );
  }
}

export default connect(({ orders }) => ({
  cart: orders.cart,
  totalPrice: orders.totalPrice,
}))(Order);

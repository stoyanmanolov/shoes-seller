import React from "react";
import { CartEmpty, StyledCartList, Checkout } from "./CartList-styles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

export class CartList extends React.Component {
  renderTable = () => {
    const renderShoe = () => {
      return this.props.cart.map((item, index) => {
        const numberOfShoes = item.sizes.length;
        const modelPrice = item.shoe.price * numberOfShoes;

        return (
          <tr id={item.shoe.model} key={index}>
            <td className="shoe">
              <img src={"images/" + item.shoe.frontImage} alt="Front" />
              <div>
                <h5 id="count-info">{`${numberOfShoes}x ${item.shoe.brand} ${item.shoe.model}`}</h5>
                <p id="sizes-info">
                  <b>Sizes: </b>
                  {item.sizes.join(", ")}
                </p>
              </div>
            </td>
            <td id="price-info" className="price">
              {"$" + modelPrice.toFixed(2)}
            </td>
          </tr>
        );
      });
    };

    return (
      <table>
        <thead>
          <tr>
            <th>Shoes</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>{renderShoe()}</tbody>
      </table>
    );
  };

  render() {
    if (this.props.cart.length === 0) {
      return (
        <CartEmpty id="cart-empty">
          <h3>Your cart is empty</h3>
        </CartEmpty>
      );
    } else
      return (
        <StyledCartList id="cart-list">
          {this.renderTable()}
          <Checkout>
            <p>Subtotal: ${this.props.totalPrice.toFixed(2)}</p>
            <Link to="/checkout">
              <Button
                id="checkout-button"
                className="checkout-button"
                primary
                size="large"
              >
                Checkout
              </Button>
            </Link>
          </Checkout>
        </StyledCartList>
      );
  }
}

export default connect(({ orders }) => ({
  cart: orders.cart,
  totalPrice: orders.totalPrice,
}))(CartList);

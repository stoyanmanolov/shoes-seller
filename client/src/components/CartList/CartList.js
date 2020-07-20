import React from "react";
import { CartEmpty, StyledCartList } from "./CartList-styles";
import { connect } from "react-redux";

export class CartList extends React.Component {
  state = { totalPrice: null };

  componentDidMount() {
    if (this.props.cart.length !== 0) {
      // Calculate total price
      let totalPrice = 0;

      this.props.cart.forEach((item) => {
        const modelPrice = item.shoe.price * item.sizes.length;
        totalPrice += modelPrice;
      });

      this.setState({ totalPrice });
    }
  }

  renderTable = () => {
    const renderShoe = () => {
      return this.props.cart.map((item, index) => {
        const numberOfShoes = item.sizes.length;
        const modelPrice = item.shoe.price * numberOfShoes;

        return (
          <tr id={item.shoe.model} className="item-data" key={index}>
            <td className="shoe">
              <img
                className="front-image"
                src={"images/" + item.shoe.frontImage}
                alt="Front"
              />
              <div className="info">
                <h5 id="count">{`${numberOfShoes}x ${item.shoe.brand} ${item.shoe.model}`}</h5>
                <p id="sizes">
                  <b>Sizes: </b>
                  {item.sizes.join(", ")}
                </p>
              </div>
            </td>
            <td id="price" className="price">
              {"$" + modelPrice.toFixed(2)}
            </td>
          </tr>
        );
      });
    };

    return (
      <div className="table-wrapper">
        <table>
          <thead>
            <tr className="headings">
              <th className="shoes">Shoes</th>
              <th className="total">Total</th>
            </tr>
          </thead>
          <tbody>{renderShoe()}</tbody>
        </table>
      </div>
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
      return <StyledCartList id="cart">{this.renderTable()}</StyledCartList>;
  }
}

export default connect(({ orders }) => ({
  cart: orders.cart,
  itemsCount: orders.itemsCount,
}))(CartList);

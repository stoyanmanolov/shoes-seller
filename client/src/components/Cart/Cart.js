import React from "react";
import { StyledCart } from "./Cart-styles";
import { connect } from "react-redux";

export class Cart extends React.Component {
  renderTable = () => {
    const { cart } = this.props;

    if (cart.length === 0) return null;

    return (
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => {
            return (
              <tr key={index}>
                <td className="item-data">
                  <img
                    className="front-image"
                    src={"images/" + item.shoe.frontImage}
                    alt="Front"
                  />
                  <div className="text-data">
                    <h3>{item.shoe.brand}</h3>
                    <p>{item.shoe.model}</p>
                  </div>
                </td>
                <td className="item-price">{item.shoe.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  render() {
    return <StyledCart>{this.renderTable()}</StyledCart>;
  }
}

export default connect(({ orders }) => ({ cart: orders.cart }))(Cart);

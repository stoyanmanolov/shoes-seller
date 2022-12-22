import React from "react";
import * as Styled from "./CartList.styles";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const CartList = () => {
  const cart = useSelector((state) => state.orders.cart);
  const totalPrice = useSelector((state) => state.orders.totalPrice);

  const renderTable = () => {
    const renderShoe = () => {
      return cart.map((item, index) => {
        const numberOfShoes = item.sizes.length;
        const modelPrice = item.shoe.price * numberOfShoes;

        return (
          <tr key={index}>
            <td className="shoe">
              <img src={"images/" + item.shoe.frontImage} alt="Front" />
              <div>
                <h5>{`${numberOfShoes}x ${item.shoe.brand} ${item.shoe.model}`}</h5>
                <p>
                  <b>Sizes: </b>
                  {item.sizes.join(", ")}
                </p>
              </div>
            </td>
            <td className="price">{"$" + modelPrice.toFixed(2)}</td>
          </tr>
        );
      });
    };

    return (
      <Styled.Table>
        <thead>
          <tr>
            <th>Shoes</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>{renderShoe()}</tbody>
      </Styled.Table>
    );
  };

  if (cart.length === 0) {
    return <Styled.Heading>Your cart is empty</Styled.Heading>;
  } else {
    return (
      <Styled.CartList>
        {renderTable()}
        <Styled.Checkout>
          <p>Subtotal: ${totalPrice.toFixed(2)}</p>
          <Link to="/checkout">
            <Styled.Button primary size="large">
              Checkout
            </Styled.Button>
          </Link>
        </Styled.Checkout>
      </Styled.CartList>
    );
  }
};

export default CartList;

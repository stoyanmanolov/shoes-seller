import React from "react";
import { useSelector } from "react-redux";
import * as Styled from "./OrderList.styles";

const OrderList = () => {
  const cart = useSelector((state) => state.orders.cart);
  const totalPrice = useSelector((state) => state.orders.totalPrice);

  const renderTable = () => {
    const renderShoe = () => {
      return cart.map((item, index) => {
        const numberOfShoes = item.sizes.length;
        const modelPrice = item.shoe.price * numberOfShoes;

        return (
          <tr key={index}>
            <td className="shoe-info">
              <img src={"images/" + item.shoe.frontImage} alt="Front" />
              <div>
                <h5>{`${numberOfShoes}x ${item.shoe.brand} ${item.shoe.model}`}</h5>
                <p>
                  <b>Sizes: </b>
                  {item.sizes.join(", ")}
                </p>
              </div>
            </td>
            <td className="price-info">{"$" + modelPrice.toFixed(2)}</td>
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

  return (
    <Styled.OrderList>
      <h4>Your order</h4>
      {renderTable()}
      <p className="total-price">Subtotal: ${totalPrice.toFixed(2)}</p>
    </Styled.OrderList>
  );
};

export default OrderList;

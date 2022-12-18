import React from "react";
import { StyledOrderList } from "./OrderList-styles";

const OrderList = (props) => {
  const renderTable = (cart, totalPrice) => {
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
      <>
        <table>
          <thead>
            <tr>
              <th>Shoes</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>{renderShoe()}</tbody>
        </table>
        <p className="total-price">Subtotal: ${totalPrice.toFixed(2)}</p>
      </>
    );
  };

  return (
    <StyledOrderList>
      <h4>Your order</h4>
      {renderTable(props.cart, props.totalPrice)}
    </StyledOrderList>
  );
};

export default OrderList;

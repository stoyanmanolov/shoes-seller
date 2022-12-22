import React, { useEffect, useState } from "react";
import * as Styled from "./OrdersList.styles";
import Error from "../Error";
import { OrdersAPI } from "../../api";
import { useSelector } from "react-redux";

export const OrdersList = () => {
  const [clickedIndexes, setClickedIndexes] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  const [error, setError] = useState();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const config = {
      headers: {
        "X-Auth-Token": token,
      },
    };

    OrdersAPI.getOrders(config)
      .then((response) => {
        setError("");
        setOrdersList(response.data);
      })
      .catch((error) => setError(error.response));
  }, []);

  const renderTable = (ordersList) => {
    const expandItem = (e, index) => {
      if (clickedIndexes.includes(index)) {
        setClickedIndexes((prev) => prev.filter((item) => item !== index));
      } else setClickedIndexes((prev) => [...prev, index]);
    };

    const renderDetails = (order) => {
      return (
        <div>
          <p>
            <b>Name:</b> {order.firstName + " " + order.lastName}
          </p>
          <p>
            <b>Email:</b> {order.email}
          </p>
          <p>
            <b>Phone:</b> {order.phoneNumber}
          </p>
          <p>
            <b>City:</b> {order.city}
          </p>
          <p>
            <b>Address:</b> {order.address}
          </p>
          <p>
            <b>Date added:</b> {new Date(order.createdAt).toDateString()}
          </p>
          <p>
            <b>Cart:</b> <br />
            {order.cart.map(({ shoe, sizes }) => {
              return (
                <>
                  <b>{` ${shoe.brand} ${shoe.model} `}</b>
                  in sizes
                  <b>{` (${sizes.join(", ")}) `}</b>
                  <br />
                </>
              );
            })}
          </p>
        </div>
      );
    };

    const completeOrder = (id, token) => {
      OrdersAPI.markOrderAsComplete(id, token).then((response) => {
        window.alert("Completed successfully!");
      });

      this.props.fetchOrders(token);
    };

    const renderOrder = () => {
      return ordersList.map((order, index) => {
        return (
          <tr key={index}>
            <td className="info" onClick={(e) => expandItem(e, index)}>
              {order._id}
              {!clickedIndexes.includes(index) ? (
                <p>
                  <b>Click for more info...</b>
                </p>
              ) : (
                renderDetails(order)
              )}
            </td>
            <td>${order.price.toFixed(2)}</td>
            <td>
              {order.completed ? (
                <p>Yes</p>
              ) : (
                <>
                  <p>No</p>
                  <p
                    className="complete"
                    onClick={(e) => completeOrder(order._id, token)}
                  >
                    Click to complete
                  </p>
                </>
              )}
            </td>
          </tr>
        );
      });
    };

    return (
      <Styled.Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fee</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>{renderOrder()}</tbody>
      </Styled.Table>
    );
  };

  if (error) return <Error status={error.status} message={error.statusText} />;
  else if (ordersList.length === 0)
    return (
      <Styled.OrdersList>
        <Styled.Heading>There are no orders</Styled.Heading>
      </Styled.OrdersList>
    );
  else
    return (
      <Styled.OrdersList>
        <Styled.Heading>Orders</Styled.Heading>
        {renderTable(ordersList)}
      </Styled.OrdersList>
    );
};

export default OrdersList;

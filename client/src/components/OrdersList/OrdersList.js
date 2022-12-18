import React from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../../redux/actions/ordersActions";
import { StyledOrdersList } from "./OrdersList-styles";
import Error from "../Error";
import { OrdersAPI } from "../../api";

export class OrdersList extends React.Component {
  state = { clickedIndexes: [] };

  componentDidMount() {
    this.props.fetchOrders(this.props.token);
  }

  renderTable = (ordersList) => {
    const expandItem = (e, index) => {
      if (this.state.clickedIndexes.includes(index)) {
        this.setState({
          clickedIndexes: this.state.clickedIndexes.filter(
            (item) => item !== index
          ),
        });
      } else
        this.setState({
          clickedIndexes: [...this.state.clickedIndexes, index],
        });
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
              {!this.state.clickedIndexes.includes(index) ? (
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
                    onClick={(e) => completeOrder(order._id, this.props.token)}
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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fee</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>{renderOrder()}</tbody>
      </table>
    );
  };

  render() {
    if (this.props.error)
      return (
        <Error
          status={this.props.error.status}
          message={this.props.error.statusText}
        />
      );
    else if (this.props.ordersList.length === 0)
      return (
        <StyledOrdersList>
          <h3>There are no orders</h3>
        </StyledOrdersList>
      );
    else
      return (
        <StyledOrdersList>
          <h3 className="title">Orders</h3>
          {this.renderTable(this.props.ordersList)}
        </StyledOrdersList>
      );
  }
}

export default connect(
  ({ orders, auth, errors }) => ({
    error: errors.orders.ordersList,
    token: auth.token,
    ordersList: orders.ordersList,
  }),
  { fetchOrders }
)(OrdersList);

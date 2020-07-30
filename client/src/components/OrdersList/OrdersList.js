import React from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../../redux/actions/ordersActions";
import Error from "../Error";
import { Loader } from "semantic-ui-react";

export class OrdersList extends React.Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token);
  }

  render() {
    if (this.props.error)
      return (
        <Error
          status={this.props.error.status}
          message={this.props.error.statusText}
        />
      );
    else if (this.props.ordersList.length === 0)
      return <Loader active inline="centered" />;
    else return <div>OrdersList</div>;
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

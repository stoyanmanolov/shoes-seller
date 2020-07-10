import React from "react";
import { connect } from "react-redux";
import { fetchShoeDetails } from "../../redux/actions/shoesActions";
import Error from "../Error";

export class ShoeDetails extends React.Component {
  componentDidMount() {
    this.props.fetchShoeDetails(this.props.id);
  }

  render() {
    const { shoeDetails, shoeDetailsError } = this.props;
    console.log(shoeDetails);

    if (shoeDetailsError)
      return (
        <Error
          status={shoeDetailsError.status}
          message={shoeDetailsError.statusText}
        ></Error>
      );
    return <div id="shoe-details">ShoeDetails</div>;
  }
}

export default connect(
  ({ shoes, errors }) => ({
    shoeDetails: shoes.shoeDetails,
    shoeDetailsError: errors.shoes.shoeDetails,
  }),
  {
    fetchShoeDetails,
  }
)(ShoeDetails);

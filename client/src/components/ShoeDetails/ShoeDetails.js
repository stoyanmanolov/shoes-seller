import React from "react";
import { connect } from "react-redux";
import { StyledShoeDetails } from "./ShoeDetails-styles";
import { fetchShoeDetails } from "../../redux/actions/shoesActions";
import Error from "../Error";

export class ShoeDetails extends React.Component {
  componentDidMount = () => {
    this.props.fetchShoeDetails(this.props.id);
  };

  renderShoeDetails = (shoeDetails) => {
    if (!shoeDetails) return null;
    return <h3>{shoeDetails.brand + " " + shoeDetails.model}</h3>;
  };

  render() {
    const { shoeDetails, shoeDetailsError } = this.props;

    if (shoeDetailsError)
      return (
        <Error
          status={shoeDetailsError.status}
          message={shoeDetailsError.statusText}
        ></Error>
      );
    return (
      <StyledShoeDetails id="shoe-details">
        {this.renderShoeDetails(shoeDetails)}
      </StyledShoeDetails>
    );
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

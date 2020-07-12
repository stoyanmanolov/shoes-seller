import React from "react";
import { connect } from "react-redux";
import { StyledShoeDetails, Images } from "./ShoeDetails-styles";
import { fetchShoeDetails } from "../../redux/actions/shoesActions";
import Error from "../Error";

export class ShoeDetails extends React.Component {
  state = {
    selectedImage: "",
  };

  componentDidMount = () => {
    this.props.fetchShoeDetails(this.props.id);
  };

  renderShoeDetails = (shoeDetails) => {
    if (!shoeDetails) return null;

    console.log(shoeDetails);
    const {
      brand,
      model,
      category,
      frontImage,
      description,
      price,
      images,
    } = shoeDetails;

    const renderImages = (frontImage, images) => {
      if (!this.state.selectedImage) {
        this.setState({ selectedImage: frontImage });
      }

      if (!images.includes(frontImage)) images.splice(0, 0, frontImage);

      return (
        <Images id="images">
          <img
            className="front-image"
            src={`/images/${this.state.selectedImage}`}
            alt="Front"
          />
          <div className="other-images">
            {images.map((image, index) => {
              return (
                <img
                  onClick={(e) => this.setState({ selectedImage: image })}
                  src={`/images/${image}`}
                  alt={image}
                  key={index}
                />
              );
            })}
          </div>
        </Images>
      );
    };

    return (
      <StyledShoeDetails id="shoe-details">
        {renderImages(frontImage, images)}
        <h2>{brand + " " + model}</h2>
        <span>{category}</span>
        <p>{description}</p>
      </StyledShoeDetails>
    );
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
    return this.renderShoeDetails(shoeDetails);
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

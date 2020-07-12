import React from "react";
import { connect } from "react-redux";
import { StyledShoeDetails, Images, Sizes } from "./ShoeDetails-styles";
import { fetchShoeDetails } from "../../redux/actions/shoesActions";
import Error from "../Error";
import { Button } from "semantic-ui-react";

export class ShoeDetails extends React.Component {
  state = {
    selectedImage: "",
    selectedSize: null,
  };

  componentDidMount = () => {
    this.props.fetchShoeDetails(this.props.id);
  };

  componentDidUpdate = () => {
    if (!this.state.selectedImage && this.props.shoeDetails) {
      this.setState({ selectedImage: this.props.shoeDetails.frontImage });
    }
  };

  renderImages = (frontImage, images) => {
    if (!this.state.selectedImage) return null;

    if (!images.includes(frontImage)) images.splice(0, 0, frontImage);

    return (
      <Images id="images">
        <img
          className="selected-image"
          src={`/images/${this.state.selectedImage}`}
          alt="Front"
        />
        <div className="other-images">
          {images.map((image, index) => {
            return (
              <img
                id={"image" + index}
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

  renderSizes = (sizes) => {
    if (!sizes) return null;

    return (
      <Sizes id="sizes" length={sizes.length}>
        {sizes.map((size) => {
          return (
            <Button
              active={size === this.state.selectedSize ? true : false}
              onClick={(e, selected) =>
                this.setState({ selectedSize: selected.value })
              }
              basic
              value={size}
              key={size}
            >
              {size}
            </Button>
          );
        })}
      </Sizes>
    );
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
      sizes,
    } = shoeDetails;

    return (
      <StyledShoeDetails id="shoe-details">
        <span className="category">{category}</span>
        <h2 className="shoe-name">{brand + " " + model}</h2>
        <span className="price">{"$" + price}</span>
        {this.renderImages(frontImage, images)}
        {this.renderSizes(sizes)}
        <p className="description">{description}</p>
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
    return <>{this.renderShoeDetails(shoeDetails)}</>;
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

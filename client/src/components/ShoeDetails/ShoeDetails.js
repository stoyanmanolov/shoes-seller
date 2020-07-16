import React from "react";
import { connect } from "react-redux";
import {
  StyledShoeDetails,
  Images,
  Sizes,
  CartButton,
  Text,
  InputPanel,
} from "./ShoeDetails-styles";
import { fetchShoeDetails } from "../../redux/actions/shoesActions";
import { addToCart } from "../../redux/actions/ordersActions";
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
    const { shoeDetails } = this.props;

    if (!this.state.selectedImage && shoeDetails) {
      this.setState({ selectedImage: shoeDetails.frontImage });
    }
  };

  renderImages = (frontImage, images) => {
    if (!this.state.selectedImage) return null;

    if (!images.includes(frontImage)) images.splice(0, 0, frontImage);

    return (
      <Images id="images" className="images">
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
      <Sizes length={sizes.length}>
        <p className="size-text">Select size:</p>
        <div className="sizes-grid" id="sizes">
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
        </div>
      </Sizes>
    );
  };

  renderShoeDetails = (shoeDetails) => {
    if (!shoeDetails) return null;

    const {
      brand,
      model,
      category,
      frontImage,
      description,
      price,
      images,
      sizes,
      color,
      gender,
    } = shoeDetails;

    const handleClick = () => {
      this.props.addToCart(shoeDetails);
    };

    return (
      <StyledShoeDetails id="shoe-details">
        <div id="top-panel" className="top-panel">
          <span className="category">{category}</span>
          <h2 className="shoe-name">{brand + " " + model}</h2>
          <span className="price">{"$" + price}</span>
        </div>
        {this.renderImages(frontImage, images)}
        <div id="bottom-panel" className="bottom-panel">
          <InputPanel>
            {this.renderSizes(sizes)}
            <CartButton
              id="cart-button"
              onClick={handleClick}
              disabled={this.state.selectedSize ? false : true}
            >
              {this.state.selectedSize
                ? "Add to Cart"
                : "Select a size to continue"}
            </CartButton>
          </InputPanel>
          <Text>
            <p className="gender">
              <b>Gender:</b> {gender}
            </p>
            <p className="color">
              <b>Color:</b> {color}
            </p>
            <p className="description">
              <b>Description:</b> {description}
            </p>
          </Text>
        </div>
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
    addToCart,
  }
)(ShoeDetails);

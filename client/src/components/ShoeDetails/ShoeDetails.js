import React from "react";
import { useDispatch } from "react-redux";
import * as Styled from "./ShoeDetails.styles";
import { addToCart } from "../../redux/actions/ordersActions";
import Error from "../Error";
import { Button, Loader } from "semantic-ui-react";
import { useEffect } from "react";
import { ShoesAPI } from "../../api";
import { useState } from "react";

export const ShoeDetails = ({ id }) => {
  const [shoe, setShoe] = useState();
  const [error, setError] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    ShoesAPI.getShoe(id)
      .then((response) => {
        setShoe(response.data);
        setSelectedImage(response.data.frontImage);
      })
      .catch((error) => {
        setError(error.response);
      });
  }, []);

  const handleClick = () => {
    dispatch(addToCart(shoe, selectedSize));
  };

  if (error)
    return <Error status={error.status} message={error.statusText}></Error>;
  else if (!shoe) {
    return <Loader active />;
  } else {
    return (
      <Styled.ShoeDetails>
        <Styled.TopPanel>
          <span className="category">{shoe.category}</span>
          <h2 className="shoe-name">{shoe.brand + " " + shoe.model}</h2>
          <span className="price">{"$" + shoe.price}</span>
        </Styled.TopPanel>
        <Styled.ImagesContainer>
          <Styled.SelectedImage src={`/images/${selectedImage}`} alt="Front" />
          <Styled.OtherImagesContainer>
            {[...shoe.images, shoe.frontImage].map((image, index) => {
              return (
                <Styled.Image
                  key={index}
                  src={`/images/${image}`}
                  onClick={(e) => setSelectedImage(image)}
                  alt={image}
                />
              );
            })}
          </Styled.OtherImagesContainer>
        </Styled.ImagesContainer>
        <Styled.BottomPanel>
          <Styled.InputPanel>
            <Styled.Sizes>
              <p>Select size:</p>
              <Styled.SizesGrid sizesCount={shoe.sizes.length}>
                {shoe.sizes.map((size) => {
                  return (
                    <Button
                      key={size}
                      active={size === selectedSize}
                      onClick={(e, selected) => setSelectedSize(selected.value)}
                      value={size}
                      basic
                    >
                      {size}
                    </Button>
                  );
                })}
              </Styled.SizesGrid>
            </Styled.Sizes>
            <Styled.CartButton onClick={handleClick} disabled={!selectedSize}>
              {selectedSize ? "Add to Cart" : "Select a size to continue"}
            </Styled.CartButton>
          </Styled.InputPanel>
          <div>
            <p>
              <b>Gender:</b> {shoe.gender}
            </p>
            <p>
              <b>Color:</b> {shoe.color}
            </p>
            <p>
              <b>Description:</b> {shoe.description}
            </p>
          </div>
        </Styled.BottomPanel>
      </Styled.ShoeDetails>
    );
  }
};

export default ShoeDetails;

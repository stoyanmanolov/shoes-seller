import React from "react";
import Slider from "@material-ui/core/Slider";
import { Input } from "semantic-ui-react";
import { StyledPriceRange } from "./PriceRange-styles";

const PriceRange = (props) => {
  const { minPrice, maxPrice } = props.boundries;

  const [value, setValue] = React.useState([minPrice, maxPrice]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <StyledPriceRange {...props}>
      <Slider
        id="slider"
        className="slider"
        value={value}
        min={minPrice}
        max={maxPrice}
        onChange={handleSliderChange}
        onChangeCommitted={(e) => props.getPrice(value)}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />
      <Input
        readOnly
        id="minimum"
        name="0"
        className="min"
        type="number"
        value={value[0]}
      ></Input>
      <p className="divider">-</p>
      <Input
        readOnly
        id="maximum"
        name="1"
        className="max"
        type="number"
        value={value[1]}
      ></Input>
    </StyledPriceRange>
  );
};

export default PriceRange;

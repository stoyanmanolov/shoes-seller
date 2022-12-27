import React from "react";
import Slider from "@material-ui/core/Slider";
import { Input } from "semantic-ui-react";
import * as Styled from "./PriceRange.styles";

const PriceRange = ({ toggled, handlePriceChange, boundries }) => {
  const { minPrice, maxPrice } = boundries;

  const [value, setValue] = React.useState([minPrice, maxPrice]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Styled.PriceRange toggled={toggled}>
      <Slider
        className="slider"
        value={value}
        min={minPrice}
        max={maxPrice}
        onChange={handleSliderChange}
        onChangeCommitted={(e) => handlePriceChange(value)}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />
      <Input
        readOnly
        name="0"
        className="min"
        type="number"
        value={value[0]}
      ></Input>
      <p className="divider">-</p>
      <Input
        readOnly
        name="1"
        className="max"
        type="number"
        value={value[1]}
      ></Input>
    </Styled.PriceRange>
  );
};

export default PriceRange;

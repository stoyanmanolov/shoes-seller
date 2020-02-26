import React from "react";
import Slider from "@material-ui/core/Slider";
import { Input } from "semantic-ui-react";
import { StyledPriceRange } from "./PriceRange-styles";

const PriceRange = props => {
  const { minPrice, maxPrice } = props.boundries;

  const [value, setValue] = React.useState([minPrice, maxPrice]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (newValue, index) => {
    newValue = parseInt(newValue);
    index = parseInt(index);

    if (!newValue) {
      newValue = "";
    }

    if (index === 0) {
      setValue([newValue, value[1]]);
    } else if (index === 1) {
      setValue([value[0], newValue]);
    }
  };

  const setZeroesIfEmpty = value => {
    let newValue = [];
    if (value[0] === "" && value[1] === "") {
      newValue = [0, 0];
    } else if (value[1] === "") {
      newValue = [value[0], 0];
    } else if (value[0] === "") {
      newValue = [0, value[1]];
    }
    if (newValue.length) return newValue;
    else return value;
  };

  return (
    <StyledPriceRange>
      <Slider
        id="slider"
        className="slider"
        value={setZeroesIfEmpty(value)}
        min={minPrice}
        max={maxPrice}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />
      <Input
        id="minimum"
        name="0"
        className="min"
        type="number"
        onChange={event =>
          handleInputChange(event.target.value, event.target.name)
        }
        value={value[0]}
      ></Input>
      <p className="divider">-</p>
      <Input
        id="maximum"
        name="1"
        className="max"
        type="number"
        onChange={event =>
          handleInputChange(event.target.value, event.target.name)
        }
        value={value[1]}
      ></Input>
    </StyledPriceRange>
  );
};

export default PriceRange;

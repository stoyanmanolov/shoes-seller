import styled from "styled-components";

export const StyledPriceRange = styled.div`
  display: grid;
  grid-template-areas:
    "slider slider slider"
    "minimum divider maximum";
  column-gap: 10px;
  .slider {
    grid-area: slider;
    color: black;
  }
  input {
    width: 100%;
    .min {
      grid-area: minimum;
    }
    .max {
      grid-area: maximum;
    }
  }
  .divider {
    grid-area: divider;
    margin: 0;
    align-self: center;
  }
`;

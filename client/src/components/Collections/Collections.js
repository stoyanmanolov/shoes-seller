import React from "react";
import { Link } from "react-router-dom";

import { StyledCollections, TextOverlay } from "./Collections-styles";

export const Collections = () => {
  return (
    <StyledCollections>
      <h2>COLLECTIONS</h2>
      <ul>
        <li id="men-wrapper" className="men">
          <Link to="/men">
            <TextOverlay>Men</TextOverlay>
          </Link>
        </li>

        <li id="women-wrapper" className="women">
          <Link to="/women">
            <TextOverlay>Women</TextOverlay>
          </Link>
        </li>

        <li id="kids-wrapper" className="kids">
          <Link to="/kids">
            <TextOverlay>Kids</TextOverlay>
          </Link>
        </li>
      </ul>
    </StyledCollections>
  );
};

export default Collections;

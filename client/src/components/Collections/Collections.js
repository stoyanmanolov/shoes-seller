import React from "react";
import { Link } from "react-router-dom";

import { StyledCollections, TextOverlay } from "./Collections-styles";

const Collections = () => {
  return (
    <StyledCollections>
      <h2>COLLECTIONS</h2>
      <ul>
        <Link to="/men">
          <li className="men">
            <TextOverlay>Men</TextOverlay>
          </li>
        </Link>
        <Link to="/women">
          <li className="women">
            <TextOverlay>Women</TextOverlay>
          </li>
        </Link>
        <Link to="/kids">
          <li className="kids">
            <TextOverlay>Kids</TextOverlay>
          </li>
        </Link>
      </ul>
    </StyledCollections>
  );
};

export default Collections;

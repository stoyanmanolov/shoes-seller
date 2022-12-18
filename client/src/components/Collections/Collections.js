import React from "react";
import { Link } from "react-router-dom";
import * as Styled from "./Collections.styles";

export const Collections = () => {
  return (
    <Styled.Container>
      <h2>COLLECTIONS</h2>
      <Styled.List>
        <Styled.ListItem type="MEN">
          <Link to="/men">
            <Styled.TextOverlay>Men</Styled.TextOverlay>
          </Link>
        </Styled.ListItem>

        <Styled.ListItem type="WOMEN">
          <Link to="/women">
            <Styled.TextOverlay>Women</Styled.TextOverlay>
          </Link>
        </Styled.ListItem>

        <Styled.ListItem type="KIDS">
          <Link to="/kids">
            <Styled.TextOverlay>Kids</Styled.TextOverlay>
          </Link>
        </Styled.ListItem>
      </Styled.List>
    </Styled.Container>
  );
};

export default Collections;

import styled, { css } from "styled-components";
import Men from "./images/men.jpg";
import Women from "./images/women.jpg";
import Kids from "./images/kids.jpg";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
`;

export const List = styled.ul`
  display: flex;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const ListItem = styled.li`
  margin: 20px;
  height: 300px;
  width: 300px;
  list-style-type: none;
  ${(props) => {
    switch (props.type) {
      case "MEN": {
        return css`
          background-image: url(${Men});
          background-size: cover;
          background-position: center;
        `;
      }
      case "WOMEN": {
        return css`
          background-image: url(${Women});
          background-size: cover;
          background-position: center;
        `;
      }
      case "KIDS": {
        return css`
          background-image: url(${Kids});
          background-size: cover;
          background-position: center;
        `;
      }
      default: {
        return css``;
      }
    }
  }}
  @media (min-width: 768px) {
    max-width: 300px;
  }
`;

export const TextOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  height: 100%;
  width: 100%;
  position: relative;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.25) calc(100% - 150px),
    rgba(0, 0, 0, 0.38) calc(100% - 60px),
    rgba(0, 0, 0, 0.5)
  );
  color: white;
  font-size: 32px;
  font-weight: 700;
`;

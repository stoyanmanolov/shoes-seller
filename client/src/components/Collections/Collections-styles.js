import styled from "styled-components";
import Men from "./images/men.jpg";
import Women from "./images/women.jpg";
import Kids from "./images/kids.jpg";

export const StyledCollections = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 100px;
  ul {
    display: flex;
    flex-direction: row;
    a > li {
      list-style-type: none;
      position: relative;

      height: 300px;
      width: 300px;
      margin: 20px;
    }
    .men {
      background-image: url(${Men});
      background-size: cover;
      background-position: center;
    }
    .women {
      background-image: url(${Women});
      background-size: cover;
      background-position: center;
    }
    .kids {
      background-image: url(${Kids});
      background-size: cover;
      background-position: center;
    }
  }
`;

export const TextOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
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

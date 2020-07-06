import styled from "styled-components";
import Men from "./images/men.jpg";
import Women from "./images/women.jpg";
import Kids from "./images/kids.jpg";

export const StyledCollections = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
  ul {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > li {
      > a {
        text-decoration: none;
      }
      list-style-type: none;
      margin: 20px;
      height: 300px;
      width: 300px;
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
    @media (min-width: 768px) {
      width: 100%;
      flex-direction: row;
      padding-left: 20px;
      padding-right: 20px;
      > li {
        max-width: 300px;
      }
    }
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

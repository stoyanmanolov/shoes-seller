import styled, { css } from "styled-components";

export const StyledShoeDetails = styled.div`
  padding: 20px;
  .top-panel {
    .shoe-name {
      font-weight: 700;
      margin: 0;
    }
    .price {
      font-size: 20px;
      margin-bottom: 10px;
    }
  }
  @media (min-width: 576px) {
    padding: 20px 80px 40px;
  }
  @media (min-width: 992px) {
    padding: 40px 160px;
    display: grid;
    grid-template-areas:
      "images top-panel"
      "images bottom-panel";
    grid-template-rows: min-content 1fr;
    grid-template-columns: 1fr 1fr;
    .top-panel {
      grid-area: top-panel;
      padding-left: 30px;
    }
    .bottom-panel {
      grid-area: bottom-panel;
      padding-top: 20px;
      padding-left: 30px;
      display: flex;
      flex-direction: column;
    }
    .images {
      grid-area: images;
    }
  }
  @media (min-width: 1200px) {
    padding: 40px 250px;
  }
`;

export const Images = styled.div`
  .selected-image {
    width: 100%;
    align-self: center;
  }
  .other-images {
    overflow-x: scroll;
    width: 100%;
    padding: 10px 0 0 0;
    display: flex;
    > img {
      height: 100px;
      max-width: 50%;
      margin-right: 10px;
      align-self: center;
      cursor: pointer;
    }
    img:focus {
      border: 1px solid black;
    }
    img:last-child {
      margin-right: 0;
    }
  }
  .other-images::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 992px) {
    .selected-image {
      max-width: 100%;
    }
    .other-images {
      > img {
        height: initial;
        max-width: 100%;
        margin: 0;
      }
      display: grid;
      gap: 10px;
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export const Sizes = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  align-self: center;
  .size-text {
    margin-bottom: 10px;
    font-weight: 700;
  }
  .sizes-grid {
    display: grid;
    ${({ length }) =>
      length < 4
        ? css`
            grid-template-columns: repeat(${length}, 1fr);
          `
        : css`
            grid-template-columns: repeat(4, 1fr);
          `}
  }
`;

export const CartButton = styled.button`
  margin-bottom: 20px;
  height: 50px;
  width: 200px;
  border: 1px solid black;
  background-color: transparent;
  border-radius: 30px;
  align-self: center;
  box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15);

  :enabled {
    :hover {
      background-color: black;
      border: 1px solid white;
      color: white;
    }
    :focus {
      outline: none;
    }
  }
  :disabled {
    border: 0;
  }
`;

export const Text = styled.div``;

export const InputPanel = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 992px) {
    order: 1;
  }
`;

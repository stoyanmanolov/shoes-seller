import styled, { css } from "styled-components";

export const ShoeDetails = styled.div`
  padding: 20px;
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
  }
  @media (min-width: 1200px) {
    padding: 40px 250px;
  }
`;

export const TopPanel = styled.div`
  h2 {
    margin: 5px 0 10px 0;
    font-weight: 700;
  }

  span {
    margin: 0;
    font-size: 20px;
  }

  @media (min-width: 992px) {
    grid-area: top-panel;
    padding-left: 30px;
  }
`;

export const BottomPanel = styled.div`
  @media (min-width: 992px) {
    grid-area: bottom-panel;
    padding-top: 20px;
    padding-left: 30px;
    display: flex;
    flex-direction: column;
  }
`;

export const ImagesContainer = styled.div`
  @media (min-width: 992px) {
    grid-area: images;
  }
`;

export const SelectedImage = styled.img`
  width: 100%;
  align-self: center;

  @media (min-width: 992px) {
    max-width: 100%;
  }
`;

export const OtherImagesContainer = styled.div`
  overflow-x: auto;
  width: 100%;
  padding: 10px 0 0 0;
  display: flex;

  @media (min-width: 992px) {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Image = styled.img`
  height: 100px;
  max-width: 50%;
  margin-right: 10px;
  align-self: center;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
  &:focus {
    border: 1px solid black;
  }
  @media (min-width: 992px) {
    height: initial;
    max-width: 100%;
    margin: 0;
  }
`;

export const Sizes = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  align-self: center;
  p {
    margin-bottom: 10px;
    font-weight: 700;
  }
`;

export const SizesGrid = styled.div`
  display: grid;
  gap: 5px;
  ${({ sizesCount }) =>
    sizesCount < 4
      ? css`
          grid-template-columns: repeat(${sizesCount}, 1fr);
        `
      : css`
          grid-template-columns: repeat(4, 1fr);
        `}
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

export const InputPanel = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 992px) {
    order: 1;
  }
`;

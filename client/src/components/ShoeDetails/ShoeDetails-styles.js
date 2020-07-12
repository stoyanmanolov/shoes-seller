import styled, { css } from "styled-components";

export const StyledShoeDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  .shoe-name {
    font-weight: 700;
    margin: 0;
  }
  .price {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

export const Images = styled.div`
  .selected-image {
    max-width: 100%;
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
`;

export const Sizes = styled.div`
  margin: 20px 0;
  display: grid;
  ${({ length }) =>
    length < 4
      ? css`
          grid-template-columns: repeat(${length}, 1fr);
        `
      : css`
          grid-template-columns: repeat(${4}, 1fr);
        `}
  align-self: center;
`;

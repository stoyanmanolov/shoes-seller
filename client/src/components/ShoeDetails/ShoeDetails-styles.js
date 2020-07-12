import styled from "styled-components";

export const StyledShoeDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  h2 {
    margin: 0;
  }
`;

export const Images = styled.div`
  .front-image {
    max-width: 100%;
    align-self: center;
  }
  .other-images {
    overflow-x: scroll;
    width: 100%;
    padding: 10px 0;
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

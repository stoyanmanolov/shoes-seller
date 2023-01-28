import styled from "styled-components";
import { Button as SemanticButton } from "semantic-ui-react";

export const CartList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px;

  @media (min-width: 768px) {
    padding: 20px 40px;
  }
  @media (min-width: 992px) {
    padding: 20px 100px;
  }
`;

export const Table = styled.table`
  width: 100%;

  td {
    padding-top: 10px;
  }

  thead tr {
    font-size: 18px;
  }

  thead tr th:first-child {
    width: 100%;
  }

  thead tr th:last-child {
    text-align: center;
  }

  img {
    width: 100px;
  }

  .shoe {
    display: flex;
    align-items: center;
    div {
      padding: 10px 20px;
      h5 {
        font-weight: 700;
      }
    }
  }
  .price {
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }
`;

export const Heading = styled.h3`
  text-align: center;
  padding-top: 20px;
`;

export const Checkout = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
  p {
    font-size: 16px;
    font-weight: 700;
  }

  @media (min-width: 768px) {
    align-self: flex-end;
    align-items: flex-end;
    .checkout-button {
      width: initial;
    }
  }
`;

export const Button = styled(SemanticButton)`
  width: 200px;
  margin: 0;

  @media (min-width: 768px) {
    width: initial;
  }
`;

import styled from "styled-components";

export const StyledCartList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  table {
    width: 100%;
  }
  td {
    padding-top: 10px;
  }
  .item-data {
    img {
      width: 100px;
    }
    .shoe {
      display: flex;
      align-items: center;
      .info {
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
  }
  .headings {
    font-size: 18px;
    .shoes {
      width: 100%;
    }
    .total {
      text-align: center;
    }
  }

  @media (min-width: 768px) {
    padding: 20px 40px;
  }
  @media (min-width: 992px) {
    padding: 20px 100px;
  }
`;

export const CartEmpty = styled.div`
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
  }
  .checkout-button {
    width: 200px;
    margin: 0;
  }

  @media (min-width: 768px) {
    align-self: flex-end;
    align-items: flex-end;
    .checkout-button {
      width: initial;
    }
  }
`;

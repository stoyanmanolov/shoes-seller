import styled from "styled-components";

export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  h4 {
    margin-bottom: 20px;
    text-align: center;
    font-weight: 700;
  }
  img {
    width: 100px;
  }
  .total-price {
    align-self: flex-end;
    font-weight: 700;
    font-size: 16px;
  }
`;

export const Table = styled.table`
  width: 100%;
  thead tr th:first-child {
    width: 100%;
    font-size: 16px;
  }
  thead tr th:last-child {
    text-align: center;
    font-size: 16px;
  }
  td {
    padding-top: 10px;
  }
  .shoe-info {
    display: flex;
    align-items: center;
    div {
      padding: 0 20px;
    }
  }
  .price-info {
    text-align: center;
    font-weight: 700;
  }
`;

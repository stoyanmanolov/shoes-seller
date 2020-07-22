import styled from "styled-components";

export const StyledOrderList = styled.div`
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  img {
    width: 100px;
  }
  table {
    width: 100%;
  }
  thead tr th:first-child {
    width: 100%;
  }
  thead tr th:last-child {
    text-align: center;
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
  .total-price {
    align-self: flex-end;
    font-weight: 700;
  }
`;

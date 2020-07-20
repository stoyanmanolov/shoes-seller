import styled from "styled-components";

export const StyledCartList = styled.div`
  .table-wrapper {
    padding: 10px 20px;
  }
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
  }
`;

export const CartEmpty = styled.div`
  text-align: center;
  padding-top: 20px;
`;

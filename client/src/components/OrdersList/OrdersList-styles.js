import styled from "styled-components";

export const StyledOrdersList = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  h3 {
    text-align: center;
  }
  p {
    margin: 0;
  }
  .info {
    cursor: pointer;
  }
  .title {
    text-align: center;
    font-weight: 700;
  }
  .complete {
    color: green;
    cursor: pointer;
    font-weight: 700;
  }
  table,
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
  }
  th,
  td {
    padding: 5px;
    text-align: left;
  }
  table {
    align-self: center;
    width: 100%;
    thead tr th {
      font-size: 18px;
    }
  }

  @media (min-width: 768px) {
    table {
      width: 70%;
    }
  }
`;

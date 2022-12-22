import styled from "styled-components";

export const OrdersList = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  p {
    margin: 0;
  }
  .info {
    cursor: pointer;
  }
  .complete {
    color: green;
    cursor: pointer;
    font-weight: 700;
  }
`;

export const Heading = styled.h3`
  text-align: center;
  font-weight: 700;
`;

export const Table = styled.table`
  align-self: center;
  width: 100%;
  border: 1px solid black;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
    padding: 5px;
    text-align: left;
  }
  thead tr th {
    font-size: 18px;
  }

  @media (min-width: 768px) {
    width: 70%;
  }
`;

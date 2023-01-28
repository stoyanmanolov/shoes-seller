import styled from "styled-components";

export const Order = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 30px;

  @media (min-width: 768px) {
    padding: 20px 70px;
  }
  @media (min-width: 992px) {
    padding: 20px 30px;
    flex-direction: row-reverse;
    > * {
      width: 50%;
    }
    > *:last-child {
      margin-right: 100px;
    }
  }
  @media (min-width: 1200px) {
    padding: 40px 70px;
  }
`;

export const Heading = styled.h3`
  margin: 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

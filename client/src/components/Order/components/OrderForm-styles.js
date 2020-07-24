import styled from "styled-components";

export const StyledOrderForm = styled.div`
  h4 {
    margin-bottom: 20px;
    text-align: center;
    font-weight: 700;
  }
  form {
    display: flex;
    flex-direction: column;
    .order-button {
      margin-top: 10px;
      align-self: center;
    }
  }
  @media (min-width: 992px) {
    form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;
      align-items: flex-end;
      .order-button {
        margin: 0;
        grid-column: span 2;
        width: fit-content;
        justify-self: center;
      }
    }
  }
`;

import styled from "styled-components";
import {
  Form as SemanticForm,
  Button as SemanticButton,
} from "semantic-ui-react";

export const Heading = styled.h4`
  margin-bottom: 20px;
  text-align: center;
  font-weight: 700;
`;

export const Form = styled(SemanticForm)`
  display: flex;
  flex-direction: column;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    align-items: flex-end;
  }
`;

export const Button = styled(SemanticButton)`
  align-self: center;

  @media (min-width: 992px) {
    grid-column: span 2;
    width: fit-content;
    justify-self: center;
  }
`;

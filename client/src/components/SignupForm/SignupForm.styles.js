import styled from "styled-components";
import {
  Form as SemanticForm,
  Button as SemanticButton,
} from "semantic-ui-react";

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .form {
  }
`;

export const Form = styled(SemanticForm)(`
  width: 20%;
  display: flex;
  flex-direction: column;
`);

export const Button = styled(SemanticButton)(`
  width: 100%;
`);

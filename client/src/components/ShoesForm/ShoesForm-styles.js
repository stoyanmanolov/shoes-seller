import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  .form {
    width: 30%;
    display: flex;
    flex-direction: column;
    textarea {
      resize: none;
    }
    p {
      margin-right: 10px;
      margin-left: 5px;
      display: inline-block;
    }
    button {
      margin: 0;
    }
  }
`;

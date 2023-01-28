import React from "react";
import * as Styled from "./Error.styles";

const Error = (props) => {
  return (
    <Styled.Container>
      <Styled.Status>{props.status}</Styled.Status>
      <p>{props.message}</p>
    </Styled.Container>
  );
};

export default Error;

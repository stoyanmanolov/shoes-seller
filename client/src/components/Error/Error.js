import React from "react";
import { StyledError } from "./Error-styles";

const Error = (props) => {
  return (
    <StyledError id="error-page">
      <h2 id="status" className="status">
        {props.status}
      </h2>
      <p id="message" className="message">
        {props.message}
      </p>
    </StyledError>
  );
};

export default Error;

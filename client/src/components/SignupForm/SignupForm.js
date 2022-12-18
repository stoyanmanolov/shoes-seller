import React, { useState } from "react";
import { loginUser } from "../../redux/actions/authActions";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import validate from "./validate";
import * as Styled from "./SignupForm.styles";
import { Button, Message, Form } from "semantic-ui-react";
import { UsersAPI } from "../../api";

export const SignupForm = () => {
  const [validationErrors, setValidationErrors] = useState(null);
  const [authErrors, setAuthErrors] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const submitData = {
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
    };

    const errors = validate(submitData);
    setValidationErrors(errors);

    if (_.isEmpty(errors)) {
      UsersAPI.register(submitData)
        .then((response) => {
          dispatch(loginUser(response.data));

          setAuthErrors(null);
          history.push("/");
        })
        .catch((error) => setAuthErrors(error.response.data));
    }
  };

  const renderInputs = () => {
    const inputFields = [
      {
        label: "Email",
        inputProps: { name: "email", type: "text", placeholder: "Email" },
      },
      {
        label: "Username",
        inputProps: { name: "username", type: "text", placeholder: "Username" },
      },
      {
        label: "Password",
        inputProps: {
          name: "password",
          type: "password",
          placeholder: "Password",
        },
      },
    ];

    return inputFields.map((field, index) => {
      const { label, inputProps } = field;
      const { name } = inputProps;

      return (
        <Form.Field key={index}>
          {validationErrors?.[name] && (
            <Message negative size="tiny" header={validationErrors[name]} />
          )}
          {authErrors?.[name] && (
            <Message negative size="tiny" header={authErrors[name]} />
          )}
          <label>{label}</label>
          <input {...inputProps} />
        </Form.Field>
      );
    });
  };

  return (
    <Styled.Container>
      <h3>CREATE AN ACCOUNT</h3>
      <Form onSubmit={handleSubmit}>
        {renderInputs()}
        <Button type="submit" fluid>
          Create
        </Button>
      </Form>
    </Styled.Container>
  );
};

export default SignupForm;

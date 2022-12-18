import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import * as Styled from "./LoginForm.styles";
import { Form, Button, Message } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { UsersAPI } from "../../api";

export const LoginForm = () => {
  const [authErrors, setAuthErrors] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const loginData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    UsersAPI.login(loginData)
      .then((response) => {
        dispatch(loginUser(response.data));
        history.push("/");
      })
      .catch((error) => setAuthErrors(error.response.data));
  };

  return (
    <Styled.Container>
      <h3>LOGIN</h3>
      <Form onSubmit={handleSubmit}>
        {authErrors ? (
          <Message negative size="tiny" header={authErrors} />
        ) : null}
        <Form.Field>
          <label>Username</label>
          <input name="username" type="text" placeholder="Username" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input name="password" type="password" placeholder="Password" />
        </Form.Field>
        <Button type="submit" fluid>
          Login
        </Button>
      </Form>
    </Styled.Container>
  );
};

export default LoginForm;

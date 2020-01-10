import React from "react";
import NavBar from "../../components/NavBar";
import { Container } from "./LogIn-styles";
import { Form, Button } from "semantic-ui-react";
import axios from "axios";

const LogIn = () => {
  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const sendData = {
      username: formData.get("username"),
      password: formData.get("password")
    };
    axios
      .post("/login", sendData)
      .then(response => console.log(response))
      .catch(e => console.log(e.response));
  };

  return (
    <>
      <NavBar />
      <Container>
        <h3>LOGIN</h3>
        <Form onSubmit={e => handleSubmit(e)}>
          <Form.Field>
            <label>Username</label>
            <input name="username" type="text" placeholder="Username" />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input name="password" type="password" placeholder="Password" />
          </Form.Field>
          <Button type="submit">Log in</Button>
        </Form>
      </Container>
    </>
  );
};

export default LogIn;

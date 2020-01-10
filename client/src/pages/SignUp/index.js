import React from "react";
import NavBar from "../../components/NavBar";
import { Container } from "./SignUp-styles";
import { Form, Button } from "semantic-ui-react";
import axios from "axios";

const SignUp = () => {
  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const sendData = {
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password")
    };
    axios
      .post("/register", sendData)
      .then(response => console.log(response))
      .catch(e => console.log(e.response));
  };

  return (
    <>
      <NavBar />
      <Container>
        <h3>CREATE AN ACCOUNT</h3>
        <Form onSubmit={e => handleSubmit(e)}>
          <Form.Field>
            <label>Email</label>
            <input name="email" type="text" placeholder="Email" />
          </Form.Field>
          <Form.Field>
            <label>Username</label>
            <input name="username" type="text" placeholder="Username" />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input name="password" type="password" placeholder="Password" />
          </Form.Field>
          <Button type="submit">Create</Button>
        </Form>
      </Container>
    </>
  );
};

export default SignUp;

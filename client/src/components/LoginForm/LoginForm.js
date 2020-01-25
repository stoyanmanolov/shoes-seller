import React from "react";
import { connect } from "react-redux";
import { loginUser, clearAuthErrors } from "../../redux/actions/authActions";
import { Container } from "./LoginForm-styles";
import { Form, Button } from "semantic-ui-react";

class LoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const loginData = {
      username: formData.get("username"),
      password: formData.get("password")
    };
    this.props.loginUser(loginData);
  };

  componentWillUnmount = () => {
    this.props.clearAuthErrors();
  };

  render() {
    const { authErrors } = this.props;

    if (authErrors) {
      window.alert(authErrors.data);
    }

    return (
      <>
        <Container>
          <h3>LOGIN</h3>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <Form.Field>
              <label>Username</label>
              <input name="username" type="text" placeholder="Username" />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input name="password" type="password" placeholder="Password" />
            </Form.Field>
            <Button type="submit">Login</Button>
          </Form>
        </Container>
      </>
    );
  }
}

export default connect(
  ({ auth, errors }) => ({ auth, authErrors: errors.auth.login }),
  {
    loginUser,
    clearAuthErrors
  }
)(LoginForm);

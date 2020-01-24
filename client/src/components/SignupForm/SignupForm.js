import React from "react";
import {
  registerUser,
  clearRegisteredInfo
} from "../../redux/actions/authActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import validate from "./validate";
import { Container } from "./SignupForm-styles";
import { Form, Button, Message } from "semantic-ui-react";

class SignupForm extends React.Component {
  state = { validationErrors: {} };

  handleSubmit = e => {
    e.preventDefault();
    const { registerUser } = this.props;

    const formData = new FormData(e.target);
    const signupData = {
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password")
    };

    const validationErrors = validate(signupData);
    this.setState({ validationErrors });

    const noValidationErrors =
      Object.entries(validationErrors).length === 0 &&
      validationErrors.constructor === Object;
    if (noValidationErrors) {
      registerUser(signupData);
    }
  };

  componentWillUnmount = () => {
    this.props.clearRegisteredInfo();
  };

  renderInput = () => {
    const fields = [
      {
        label: "Email",
        inputProps: { name: "email", type: "text", placeholder: "Email" }
      },
      {
        label: "Username",
        inputProps: { name: "username", type: "text", placeholder: "Username" }
      },
      {
        label: "Password",
        inputProps: {
          name: "password",
          type: "password",
          placeholder: "Password"
        }
      }
    ];

    const renderError = name => {
      const { validationErrors } = this.state;
      const { authErrors } = this.props;

      if (validationErrors[name]) {
        return <Message negative size="tiny" header={validationErrors[name]} />;
      } else if (authErrors) {
        if (authErrors.data[name])
          return (
            <Message negative size="tiny" header={authErrors.data[name]} />
          );
      }
    };

    return fields.map((field, index) => {
      const { label, inputProps } = field;
      const name = label.toLowerCase();

      return (
        <Form.Field key={index}>
          {renderError(name)}
          <label>{label}</label>
          <input {...inputProps}></input>
        </Form.Field>
      );
    });
  };

  render() {
    const { registeredInfo } = this.props;
    if (registeredInfo) {
      return (
        <Container>
          <h3>Registration successful.</h3>
          <p>{`Email: ${registeredInfo.email}`}</p>
          <p>{`Username: ${registeredInfo.username}`}</p>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </Container>
      );
    }

    return (
      <Container>
        <h3>CREATE AN ACCOUNT</h3>
        <Form onSubmit={e => this.handleSubmit(e)}>
          {this.renderInput()}
          <Button type="submit">Create</Button>
        </Form>
      </Container>
    );
  }
}

export default connect(
  ({ auth, errors }) => ({
    registeredInfo: auth.registeredInfo,
    authErrors: errors.auth
  }),
  { registerUser, clearRegisteredInfo }
)(SignupForm);

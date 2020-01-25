import React from "react";
import {
  registerUser,
  clearRegisteredInfo,
  clearAuthErrors
} from "../../redux/actions/authActions";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import validate from "./validate";
import { Container } from "./SignupForm-styles";
import { Form, Button, Message } from "semantic-ui-react";

export class SignupForm extends React.Component {
  state = { email: "", username: "", password: "", validationErrors: {} };

  handleSubmit = e => {
    e.preventDefault();
    const { email, username, password } = this.state;

    const signupData = { email, username, password };

    const validationErrors = validate(signupData);
    this.setState({ validationErrors });

    if (_.isEmpty(validationErrors)) {
      this.props.registerUser(signupData);
    }
  };

  componentWillUnmount = () => {
    this.props.clearRegisteredInfo();
    this.props.clearAuthErrors();
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

    const renderError = fieldName => {
      const { validationErrors } = this.state;
      const { authErrors } = this.props;

      if (validationErrors[fieldName]) {
        return (
          <Message negative size="tiny" header={validationErrors[fieldName]} />
        );
      } else if (authErrors) {
        if (authErrors.data[fieldName])
          return (
            <Message negative size="tiny" header={authErrors.data[fieldName]} />
          );
      }
    };

    return fields.map((field, index) => {
      const { label, inputProps } = field;
      const { name } = inputProps;

      return (
        <Form.Field key={index}>
          {renderError(name)}
          <label>{label}</label>
          <input
            onChange={e => this.setState({ [name]: e.target.value })}
            value={this.state[name]}
            {...inputProps}
          ></input>
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
  state => ({
    registeredInfo: state.auth.registeredInfo,
    authErrors: state.errors.auth.register
  }),
  { registerUser, clearRegisteredInfo, clearAuthErrors }
)(SignupForm);

import React from "react";
import { registerUser } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import validate from "./validate";
import { Container } from "./SignupForm-styles";
import { Form, Button, Message } from "semantic-ui-react";

class SignupForm extends React.Component {
  state = { errors: [] };

  handleSubmit = e => {
    e.preventDefault();
    const { registerUser } = this.props;
    const formData = new FormData(e.target);
    const signupData = {
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password")
    };
    const errors = validate(signupData);
    this.setState({ errors });

    if (!errors) registerUser(signupData);
  };

  renderInput = () => {
    const fields = [
      {
        label: "Email",
        input: <input name="email" type="text" placeholder="Email" />
      },
      {
        label: "Username",
        input: <input name="username" type="text" placeholder="Username" />
      },
      {
        label: "Password",
        input: <input name="password" type="password" placeholder="Password" />
      }
    ];

    return fields.map((field, index) => {
      const { errors } = this.state;
      const { label, input } = field;

      return (
        <Form.Field key={index}>
          {errors[label.toLowerCase()] ? (
            <Message
              negative
              size="tiny"
              header={errors[label.toLowerCase()]}
            />
          ) : null}
          <label>{label}</label>
          {input}
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
          <p>{registeredInfo.email}</p>
          <p>{registeredInfo.username}</p>
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
  ({ auth }) => ({ registeredInfo: auth.registeredInfo }),
  { registerUser }
)(SignupForm);

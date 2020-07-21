import React from "react";
import { Form, Button, Message } from "semantic-ui-react";
import { StyledOrderForm } from "./OrderForm-styles";
import validator from "validator";
import _ from "lodash";

class OrderForm extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    address: "",
    validationErrors: {},
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      city,
      address,
    } = this.state;

    const formData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      city,
      address,
    };

    const findErrors = (data) => {
      let errors = {};

      Object.keys(data).forEach((key) => {
        const value = data[key];

        if (value === "") {
          errors[key] = "Please fill in the field!";
        } else if (key === "email") {
          if (!validator.isEmail(value)) {
            errors[key] = "Please enter a valid email!";
          }
        } else if (key === "phoneNumber") {
          if (!validator.isMobilePhone(value)) {
            errors[key] = "Please enter a valid phone number!";
          }
        }
      });

      return errors;
    };

    const validationErrors = findErrors(formData);
    this.setState({ validationErrors });

    if (_.isEmpty(validationErrors)) {
      console.log("no errors");
    }
  };

  render() {
    const { validationErrors } = this.state;

    const formFields = [
      {
        label: "First Name",
        valueName: "firstName",
        value: this.state.firstName,
      },
      {
        label: "Last Name",
        valueName: "lastName",
        value: this.state.lastName,
      },
      {
        label: "Email",
        valueName: "email",
        value: this.state.email,
      },
      {
        label: "Phone Number",
        valueName: "phoneNumber",
        value: this.state.phoneNumber,
      },
      {
        label: "City",
        valueName: "city",
        value: this.state.city,
      },
      {
        label: "Address",
        valueName: "address",
        value: this.state.address,
      },
    ];

    return (
      <StyledOrderForm id="order-form">
        <Form onSubmit={this.handleSubmit}>
          {formFields.map(({ label, valueName, value }, index) => {
            return (
              <React.Fragment key={index}>
                {validationErrors[valueName] ? (
                  <Message
                    negative
                    size="tiny"
                    header={validationErrors[valueName]}
                  />
                ) : null}
                <Form.Field id={valueName}>
                  <label>{label}</label>
                  <input
                    onChange={(e) =>
                      this.setState({ [valueName]: e.target.value })
                    }
                    value={value}
                    placeholder={label}
                  />
                </Form.Field>
              </React.Fragment>
            );
          })}
          <Button type="submit">Submit</Button>
        </Form>
      </StyledOrderForm>
    );
  }
}

export default OrderForm;

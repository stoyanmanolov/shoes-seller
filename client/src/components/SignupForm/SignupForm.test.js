import React from "react";
import { shallow } from "enzyme";
import _ from "lodash";
import { SignupForm } from "./SignupForm";

describe("SignupForm", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SignupForm />);
  });

  it("renders all 3 Form.Fields", () => {
    const formFields = [
      { name: "email" },
      { name: "username" },
      { name: "password" }
    ];
    formFields.forEach(field => {
      const { name } = field;
      expect(
        wrapper
          .find("FormField")
          .find({ name })
          .exists()
      ).toBe(true);
    });
  });

  describe("Form is submited", () => {
    describe("Validation", () => {
      let mockRegisterUser;
      const fakeEvent = {
        preventDefault: jest.fn()
      };

      beforeEach(() => {
        mockRegisterUser = jest.fn();
        const props = { registerUser: mockRegisterUser };
        wrapper = shallow(<SignupForm {...props} />);

        wrapper.setState({
          email: "test@gmail.com",
          username: "test12345",
          password: "password12345"
        });
      });

      it("returns no errors if there aren't any", () => {
        wrapper.find("Form").simulate("submit", fakeEvent);
        expect(_.isEmpty(wrapper.state().validationErrors)).toBe(true);
      });

      it("invokes the registration function if there aren't any errors", () => {
        wrapper.find("Form").simulate("submit", fakeEvent);
        expect(mockRegisterUser).toHaveBeenCalledTimes(1);
      });

      it("handles empty fields correctly", () => {
        const fields = { email: "", username: "", password: "" };
        wrapper.setState(fields);

        wrapper.find("Form").simulate("submit", fakeEvent);
        Object.keys(fields).forEach(key => {
          expect(wrapper.state().validationErrors[key]).toBeDefined();
        });
      });

      it("handles incorrect format email correctly", () => {
        const incorrectEmail = { email: "myemail@email" };
        wrapper.setState(incorrectEmail);

        wrapper.find("Form").simulate("submit", fakeEvent);
        expect(wrapper.state().validationErrors.email).toBeDefined();

        const correctEmail = { email: "myemail@email.com" };
        wrapper.setState(correctEmail);

        wrapper.find("Form").simulate("submit", fakeEvent);
        expect(wrapper.state().validationErrors.email).toBeUndefined();
      });

      it("checks if the password is 6 or more characters", () => {
        const incorrectPassword = { password: "short" };
        wrapper.setState(incorrectPassword);

        wrapper.find("Form").simulate("submit", fakeEvent);
        expect(wrapper.state().validationErrors.password).toBeDefined();

        const correctPassword = { password: "medium" };
        wrapper.setState(correctPassword);

        wrapper.find("Form").simulate("submit", fakeEvent);
        expect(wrapper.state().validationErrors.password).toBeUndefined();
      });

      it("renders a Message component if there are any validation errors", () => {
        const incorrectData = {
          email: "myemail",
          username: "",
          password: "pass"
        };
        wrapper.setState(incorrectData);
        wrapper.find("Form").simulate("submit", fakeEvent);

        Object.keys(incorrectData).forEach(key => {
          const messageHeader = wrapper.state().validationErrors[key];
          expect(
            wrapper
              .find("FormField")
              .find({ header: messageHeader })
              .exists()
          ).toBe(true);
        });
      });
    });
    describe("Authentication errors", () => {
      let mockRegisterUser;
      const fakeEvent = {
        preventDefault: jest.fn()
      };

      beforeEach(() => {
        mockRegisterUser = jest.fn();
        const props = {
          registerUser: mockRegisterUser,
          authErrors: {
            data: {
              email: "Email not available!",
              username: "Username not available!"
            }
          }
        };
        wrapper = shallow(<SignupForm {...props} />);
      });

      it("renders a Message component if the username is taken", () => {
        const headerMessage = "Username not available!";
        expect(
          wrapper.find("FormField", { header: headerMessage }).exists()
        ).toBe(true);
      });

      it("renders a Message component if the email is taken", () => {
        const headerMessage = "Email not available!";
        expect(
          wrapper.find("FormField", { header: headerMessage }).exists()
        ).toBe(true);
      });
    });
    describe("Registration successful", () => {
      let mockRegisterUser;
      const fakeEvent = {
        preventDefault: jest.fn()
      };

      beforeEach(() => {
        mockRegisterUser = jest.fn();
        const props = {
          registerUser: mockRegisterUser,
          registeredInfo: { email: "email@email.com", username: "username" }
        };
        wrapper = shallow(<SignupForm {...props} />);
      });

      it("renders a Link to the login page", () => {
        expect(wrapper.find({ to: "/login" }).exists()).toBe(true);
      });
    });
  });
});

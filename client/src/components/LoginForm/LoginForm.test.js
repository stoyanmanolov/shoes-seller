import React from "react";
import { shallow } from "enzyme";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  let wrapper;
  let mockEvent = { preventDefault: jest.fn() };
  let loginUserMock;
  let clearAuthErrorsMock;

  const simulateSubmit = (wrapper, additionalProps) => {
    loginUserMock = jest.fn();
    clearAuthErrorsMock = jest.fn();

    let props = {
      loginUser: loginUserMock,
      clearAuthErrors: clearAuthErrorsMock,
      ...additionalProps
    };

    wrapper = shallow(<LoginForm {...props} />);
    wrapper.find("Form").simulate("submit", mockEvent);

    return wrapper;
  };

  describe("When submitted", () => {
    it("renders a error message if there is an auth error", () => {
      let props = {
        authErrors: { data: "Username or password is incorrect!" }
      };
      wrapper = simulateSubmit(wrapper, props);

      expect(wrapper.find("Message").prop("header")).toEqual(
        props.authErrors.data
      );
    });

    it("invokes loginUser if there are no errors", () => {
      let props = {
        authErrors: null
      };
      wrapper = simulateSubmit(wrapper, props);

      expect(loginUserMock).toBeCalledTimes(1);
    });

    it("invokes clearAuthErrors when the component unmounts", () => {
      let props = {
        authErrors: { data: "Username or password is incorrect!" }
      };
      wrapper = simulateSubmit(wrapper, props);

      expect(loginUserMock).toBeCalledTimes(1);
    });
  });
});

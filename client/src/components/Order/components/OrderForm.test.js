import React from "react";
import { shallow } from "enzyme";
import OrderForm from "./OrderForm";

describe("OrderForm", () => {
  let wrapper;
  const fields = [
    "firstName",
    "lastName",
    "email",
    "phoneNumber",
    "city",
    "address",
  ];

  it("renders each field", () => {
    wrapper = shallow(<OrderForm />);
    fields.forEach((field) => {
      expect(wrapper.find({ id: field }).exists()).toBe(true);
    });
  });

  it("handles empty fields correctly", () => {
    wrapper
      .find({ id: "order-form" })
      .find("Form")
      .simulate("submit", { preventDefault: jest.fn() });
    fields.forEach;
    fields.forEach((field) => {
      expect(wrapper.state().validationErrors[field]).toBeTruthy();
    });
  });

  it("renders a message if there are errors", () => {
    wrapper
      .find({ id: "order-form" })
      .find("Form")
      .simulate("submit", { preventDefault: jest.fn() });
    expect(wrapper.find("Message")).toHaveLength(fields.length);
  });

  it("handles phone numbers correctly", () => {
    wrapper
      .find({ id: "order-form" })
      .find({ id: "phoneNumber" })
      .find("input")
      .simulate("change", { target: { value: "Asd" } });

    wrapper
      .find({ id: "order-form" })
      .find("Form")
      .simulate("submit", { preventDefault: jest.fn() });
    expect(wrapper.state().validationErrors["phoneNumber"]).toBeTruthy();

    wrapper
      .find({ id: "order-form" })
      .find({ id: "phoneNumber" })
      .find("input")
      .simulate("change", { target: { value: "1231123" } });

    wrapper
      .find({ id: "order-form" })
      .find("Form")
      .simulate("submit", { preventDefault: jest.fn() });
    expect(wrapper.state().validationErrors["phoneNumber"]).toBeFalsy();
  });

  it("handles emails correctly", () => {
    wrapper
      .find({ id: "order-form" })
      .find({ id: "email" })
      .find("input")
      .simulate("change", { target: { value: "Asd" } });

    wrapper
      .find({ id: "order-form" })
      .find("Form")
      .simulate("submit", { preventDefault: jest.fn() });
    expect(wrapper.state().validationErrors["email"]).toBeTruthy();

    wrapper
      .find({ id: "order-form" })
      .find({ id: "email" })
      .find("input")
      .simulate("change", { target: { value: "Asd@gmail.com" } });

    wrapper
      .find({ id: "order-form" })
      .find("Form")
      .simulate("submit", { preventDefault: jest.fn() });
    expect(wrapper.state().validationErrors["email"]).toBeFalsy();
  });
});

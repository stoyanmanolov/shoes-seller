import React from "react";
import { shallow } from "enzyme";
import AmountPerSize from "./AmountPerSize";

describe("AmountPerSize", () => {
  const wrapper = shallow(<AmountPerSizes />);

  it("renders two inputs and a button", () => {
    expect(wrapper.find({ name: "sizes" }).length).toBe(1);
    expect(wrapper.find({ name: "amounts" }).length).toBe(1);
    expect(wrapper.find({ type: "button" }).length).toBe(1);
  });

  it("when typing in the inputs it sets the values correctly", () => {
    wrapper
      .find({ name: "sizes" })
      .simulate("change", { target: { value: 124 } });
    expect(wrapper.find({ name: "sizes" }).prop("value")).toEqual(124);

    wrapper
      .find({ name: "amounts" })
      .simulate("change", { target: { value: 142 } });
    expect(wrapper.find({ name: "amounts" }).prop("value")).toEqual(142);
  });

  it("disables the button if one of the inputs is empty", () => {
    wrapper
      .find({ name: "sizes" })
      .simulate("change", { target: { value: 124 } });
    wrapper
      .find({ name: "amounts" })
      .simulate("change", { target: { value: "" } });
    expect(wrapper.find({ type: "button" }).prop("disabled")).toBe(true);

    wrapper
      .find({ name: "sizes" })
      .simulate("change", { target: { value: "" } });
    wrapper
      .find({ name: "amounts" })
      .simulate("change", { target: { value: 123 } });
    expect(wrapper.find({ type: "button" }).prop("disabled")).toBe(true);
  });

  it("enables the button if both inputs have values", () => {
    wrapper
      .find({ name: "sizes" })
      .simulate("change", { target: { value: 124 } });
    wrapper
      .find({ name: "amounts" })
      .simulate("change", { target: { value: 126 } });
    expect(wrapper.find({ type: "button" }).prop("disabled")).toBe(false);
  });

  it("clicking the button adds one more input for each of both sizes and amounts", () => {
    wrapper.find({ type: "button" }).simulate("click");
    expect(wrapper.find({ name: "sizes" }).length).toBe(2);
    expect(wrapper.find({ name: "amounts" }).length).toBe(2);
  });
});

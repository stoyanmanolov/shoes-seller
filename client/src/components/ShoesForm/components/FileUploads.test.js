import React from "react";
import { shallow } from "enzyme";
import FileUploads from "./FileUploads";

describe("FileUploads", () => {
  const wrapper = shallow(<FileUploads />);
  it("renders an input and a button", () => {
    expect(wrapper.find({ type: "file" }).exists()).toBe(true);
    expect(wrapper.find({ type: "button" }).exists()).toBe(true);
  });

  it("adds an input when the add button is clicked", () => {
    expect(wrapper.state().inputs.length).toBe(1);
    wrapper.find({ type: "button" }).simulate("click");
    expect(wrapper.state().inputs.length).toBe(2);
  });

  it("disables the button when it is clicked more than 5 times", () => {
    for (let i = 0; i < 5; i++) {
      wrapper.find({ type: "button" }).simulate("click");
    }
    expect(wrapper.find({ disabled: true }).exists()).toBe(true);
  });
});

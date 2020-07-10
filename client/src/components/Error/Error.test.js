import React from "react";
import { shallow } from "enzyme";
import Error from "./Error";

describe("Error", () => {
  let wrapper, props;
  props = { ...props, errorMessage: { status: "404", message: "Not found." } };
  wrapper = shallow(<Error {...props} />);

  it("renders correctly", () => {
    expect(wrapper.find({ id: "error-page" }).exists()).toBe(true);
  });

  it("renders a status", () => {
    expect(wrapper.find({ id: "status" }).text()).toEqual(props.status);
  });

  it("renders a message", () => {
    expect(wrapper.find({ id: "message" }).text()).toEqual(props.message);
  });
});

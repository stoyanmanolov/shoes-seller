import React from "react";
import { shallow } from "enzyme";
import { AddAdminForm } from "./AddAdminForm";

describe("AddAdminForm", () => {
  // Add tests.
  it("renders correctly", () => {
    let wrapper = shallow(<AddAdminForm />);
    expect(wrapper.exists()).toBe(true);
  });
});

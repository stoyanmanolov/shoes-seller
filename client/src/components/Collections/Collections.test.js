import React from "react";
import { shallow } from "enzyme";
import { Collections } from "./Collections";

describe("Collections", () => {
  const wrapper = shallow(<Collections />);
  it("the links navigate to the correct pages", () => {
    expect(
      wrapper.find({ id: "men-wrapper" }).find({ to: "/men" }).exists()
    ).toBe(true);
    expect(
      wrapper.find({ id: "women-wrapper" }).find({ to: "/women" }).exists()
    ).toBe(true);
    expect(
      wrapper.find({ id: "kids-wrapper" }).find({ to: "/kids" }).exists()
    ).toBe(true);
  });
});

import React from "react";
import { shallow } from "enzyme";
import HeaderCarousel from "./HeaderCarousel";

describe("HeaderCarousel", () => {
  const wrapper = shallow(<HeaderCarousel />);
  it("the links redirect to the correct pages", () => {
    expect(wrapper.find({ id: "Men" }).find({ to: "/men" }).exists()).toBe(
      true
    );
    expect(wrapper.find({ id: "Women" }).find({ to: "/women" }).exists()).toBe(
      true
    );
    expect(wrapper.find({ id: "Kids" }).find({ to: "/kids" }).exists()).toBe(
      true
    );
  });
});

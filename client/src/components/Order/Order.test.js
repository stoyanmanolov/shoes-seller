import React from "react";
import { shallow } from "enzyme";
import { Order } from "./Order";

describe("Order", () => {
  let wrapper = shallow(<Order />);
  it("renders correctly", () => {
    expect(wrapper.find({ id: "order" }).exists()).toBe(true);
  });
});

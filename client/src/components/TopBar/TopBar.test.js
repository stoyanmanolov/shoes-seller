import React from "react";
import { mount } from "enzyme";
import TopBar from "./TopBar";

describe("TopBar", () => {
  it("renders for who the shoes are correctly", () => {
    const props = { text: "Men's shoes" };
    const wrapper = mount(<TopBar {...props} />);
    const expectedHeading = "Men's shoes";

    expect(wrapper.prop("shoesFor")).toEqual(props.shoesFor);
    expect(wrapper.find("h3").text()).toEqual(expectedHeading);
  });
});

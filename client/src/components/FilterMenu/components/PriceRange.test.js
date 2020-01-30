import React from "react";
import { shallow } from "enzyme";
import PriceRange from "./PriceRange";

describe("PriceRange", () => {
  let wrapper = shallow(<PriceRange />);
  it("renders a slider", () => {
    expect(wrapper.find("#slider").exists()).toBe(true);
  });

  it("renders a minimum value input", () => {
    expect(wrapper.find("#minimum").exists()).toBe(true);
  });

  it("renders a maximum value input", () => {
    expect(wrapper.find("#maximum").exists()).toBe(true);
  });

  it("sets the value for the slider based on the inputs", () => {
    const minInput = wrapper.find("#minimum");
    let value = 10;
    minInput.simulate("change", { target: { value, name: "0" } });

    const maxInput = wrapper.find("#maximum");
    value = 50;
    maxInput.simulate("change", { target: { value, name: "1" } });

    expect(wrapper.find("#slider").prop("value")).toEqual([10, 50]);
  });

  it("sets the value of the inputs based on the slider", () => {
    const slider = wrapper.find("#slider");
    const sliderValue = wrapper.find("#slider").prop("value");

    expect(wrapper.find("#minimum").prop("value")).toEqual(sliderValue[0]);
    expect(wrapper.find("#maximum").prop("value")).toEqual(sliderValue[1]);
  });

  it("sets an empty string if the value is 0", () => {
    const minInput = wrapper.find("#minimum");
    let value = 0;
    minInput.simulate("change", { target: { value, name: "0" } });

    expect(wrapper.find("#minimum").prop("value")).toEqual("");
  });

  it("sends a 0 to the slider if the input value is a 0 turned to an empty string", () => {
    const minInput = wrapper.find("#minimum");
    let value = 0;
    minInput.simulate("change", { target: { value, name: "0" } });

    const maxInput = wrapper.find("#maximum");
    value = 0;
    maxInput.simulate("change", { target: { value, name: "1" } });

    expect(wrapper.find("#slider").prop("value")[0]).toEqual(0);
    expect(wrapper.find("#slider").prop("value")[1]).toEqual(0);
  });
});

import React from "react";
import { shallow } from "enzyme";
import PriceRange from "./PriceRange";

describe("PriceRange", () => {
  let wrapper = shallow(
    <PriceRange boundries={{ minPrice: 11, maxPrice: 20 }} />
  );
  it("renders a slider", () => {
    expect(wrapper.find("#slider").exists()).toBe(true);
  });

  it("renders a minimum value input", () => {
    expect(wrapper.find("#minimum").exists()).toBe(true);
  });

  it("renders a maximum value input", () => {
    expect(wrapper.find("#maximum").exists()).toBe(true);
  });

  it("sets the value of the inputs based on the slider", () => {
    const slider = wrapper.find("#slider");
    const sliderValue = wrapper.find("#slider").prop("value");

    expect(wrapper.find("#minimum").prop("value")).toEqual(sliderValue[0]);
    expect(wrapper.find("#maximum").prop("value")).toEqual(sliderValue[1]);
  });
});

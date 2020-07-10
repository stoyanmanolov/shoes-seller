import React from "react";
import { shallow } from "enzyme";
import { ShoeDetails } from "./ShoeDetails";
describe("ShoeDetails", () => {
  let wrapper, props;
  const fetchShoeDetails = jest.fn();
  props = { ...props, fetchShoeDetails, id: 123 };
  wrapper = shallow(<ShoeDetails {...props} />);

  it("renders correctly", () => {
    expect(wrapper.find({ id: "shoe-details" }).exists()).toBe(true);
  });

  it("calls the fetching function", () => {
    expect(fetchShoeDetails).toBeCalledTimes(1);
  });

  it("renders an error page if there are no details", () => {
    expect(wrapper.find({ id: "error-page" }).exists()).toBe(false);
  });
});

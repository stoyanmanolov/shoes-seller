import React from "react";
import { shallow } from "enzyme";
import { ShoesList } from "./ShoesList";

describe("ShoesList", () => {
  const fetchShoesList = jest.fn();
  let props = { fetchShoesList, shoesList: { shoes: [] } };
  let wrapper = shallow(<ShoesList {...props} />);

  it("renders correctly", () => {
    expect(wrapper.find({ id: "shoes-list" }).exists()).toBe(true);
  });

  it("calls the fetching function when the component mounts", () => {
    expect(fetchShoesList).toBeCalledTimes(1);
  });

  it("calls the fetching function when the pagination gets changed", () => {
    wrapper.find({ id: "pagination" }).simulate("change");
    expect(fetchShoesList).toBeCalledTimes(2);
  });
});

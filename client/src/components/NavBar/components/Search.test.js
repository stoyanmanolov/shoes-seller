import React from "react";
import { shallow } from "enzyme";
import Search from "./Search";

describe("Search", () => {
  let wrapper;
  wrapper = shallow(<Search />);

  it("toggles the modal on button click", () => {
    wrapper.find("button").simulate("click");
    expect(wrapper.find("Modal").prop("isOpen")).toBe(true);
  });
});

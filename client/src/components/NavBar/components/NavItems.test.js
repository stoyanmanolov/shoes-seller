import React from "react";
import { shallow } from "enzyme";
import NavItems from "./NavItems";

describe("NavItems", () => {
  let wrapper;
  describe("When the toggler is clicked", () => {
    const renderNavItemsMock = jest.fn();
    wrapper = shallow(<NavItems>{renderNavItemsMock()}</NavItems>);
    wrapper.find("#toggler").simulate("click");
    it("the drawer icon turns into a font-awesome X", () => {
      expect(wrapper.find(".fa-times").exists()).toBe(true);
    });
    it("the function to render the navigation items gets called", () => {
      expect(renderNavItemsMock).toBeCalledTimes(1);
    });
  });
});

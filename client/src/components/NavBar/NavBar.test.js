import React from "react";
import { shallow } from "enzyme";
import { NavBar } from "./NavBar";
import { ListItem } from "./NavBar-styles";

describe("NavBar", () => {
  let props = { itemsCount: 3 };
  let wrapper = shallow(<NavBar {...props} />);

  it("renders the static navigation links correctly", () => {
    const staticItems = [
      { name: "Men", route: "/men" },
      { name: "Women", route: "/women" },
      { name: "Kids", route: "/kids" },
      { name: "Cart", route: "/cart" },
    ];
    staticItems.forEach((item) => {
      expect(wrapper.find({ to: item.route }).exists()).toBe(true);
    });
  });

  it("renders the number of cart items accordingly", () => {
    expect(wrapper.find({ id: "cart-items-counter" }).text()).toBe(
      props.itemsCount.toString()
    );
  });

  describe("Not authenticated", () => {
    props = {
      ...props,
      user: { role: "user" },
      isLoggedIn: false,
    };
    wrapper = shallow(<NavBar {...props} />);

    it("renders the Login link", () => {
      expect(wrapper.find({ to: "/login" }).exists()).toBe(true);
    });

    it("renders the Signup link", () => {
      expect(wrapper.find({ to: "/register" }).exists()).toBe(true);
    });
  });
  describe("Authenticated", () => {
    let logoutUserMock;
    beforeEach(() => {
      logoutUserMock = jest.fn();
      props = {
        ...props,
        user: { role: "user" },
        isLoggedIn: true,
        logoutUser: logoutUserMock,
      };
      wrapper = shallow(<NavBar {...props} />);
    });

    it("renders the Logout link", () => {
      expect(
        wrapper
          .find(ListItem)
          .find({ to: "/" })
          .contains(<p>Log out</p>)
      ).toBe(true);
    });

    it("calls logoutUser when Logout is clicked", () => {
      wrapper.find("#logout").simulate("click");
      expect(logoutUserMock).toBeCalledTimes(1);
    });
  });
  describe("Authenticated admin", () => {
    beforeEach(() => {
      props = { ...props, user: { role: "admin" }, isLoggedIn: true };
      wrapper = shallow(<NavBar {...props} />);
    });

    it("renders the Add Shoes link", () => {
      expect(wrapper.find(ListItem).find({ to: "/shoes/add" }).exists()).toBe(
        true
      );
    });
  });
});

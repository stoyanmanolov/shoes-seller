import React from "react";
import { shallow } from "enzyme";
import { Routes } from "./Routes";

describe("Routes", () => {
  let wrapper;

  it("renders all static routes", () => {
    wrapper = shallow(<Routes />);
    const routePaths = [
      { path: "/" },
      { path: "/men" },
      { path: "/women" },
      { path: "/kids" },
      { path: "/shoe/:id" },
      { path: "/cart" },
    ];

    routePaths.forEach((routePath) =>
      expect(wrapper.find(routePath).exists()).toBe(true)
    );
  });

  describe("Logged in", () => {
    beforeEach(() => {
      let props = { isLoggedIn: true, user: { role: "user" } };
      wrapper = shallow(<Routes {...props} />);
    });

    it("redirects to Home at /login", () => {
      expect(wrapper.find({ path: "/login" }).find({ to: "/" }).exists()).toBe(
        true
      );
    });

    it("redirects to Home at /register", () => {
      expect(
        wrapper.find({ path: "/register" }).find({ to: "/" }).exists()
      ).toBe(true);
    });

    it("redirects to AddShoes at /shoes/add if the user is an admin", () => {
      let props = { isLoggedIn: true, user: { role: "admin" } };
      wrapper = shallow(<Routes {...props} />);

      expect(
        wrapper.find({ path: "/shoes/add" }).find("AddShoes").exists()
      ).toBe(true);
    });

    it("redirects to Home at /shoes/add if the user is not an admin", () => {
      let props = { isLoggedIn: true, user: { role: "user" } };
      wrapper = shallow(<Routes {...props} />);

      expect(
        wrapper.find({ path: "/shoes/add" }).find({ to: "/" }).exists()
      ).toBe(true);
    });
  });
  describe("Not logged in", () => {
    beforeEach(() => {
      let props = { isLoggedIn: false, user: { role: "user" } };
      wrapper = shallow(<Routes {...props} />);
    });

    it("redirects to Signup at /register", () => {
      expect(wrapper.find({ path: "/register" }).find("Signup").exists()).toBe(
        true
      );
    });

    it("redirects to Login at /login", () => {
      expect(wrapper.find({ path: "/login" }).find("Login").exists()).toBe(
        true
      );
    });

    it("redirects to Home at /shoes/add", () => {
      expect(
        wrapper.find({ path: "/shoes/add" }).find({ to: "/" }).exists()
      ).toBe(true);
    });
  });
});

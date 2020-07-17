import React from "react";
import { Cart } from "./Cart";
import { shallow } from "enzyme";

describe("Cart", () => {
  let props = {
    cart: [
      { shoe: { brand: "MyBrand", frontImage: "Image.jpg" } },
      { shoe: { brand: "AnotherBrand", frontImage: "Image.jpg" } },
    ],
  };
  let wrapper = shallow(<Cart {...props} />);

  it("renders a table", () => {
    expect(wrapper.find("table").exists()).toBe(true);
  });
});

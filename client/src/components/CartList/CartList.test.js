import React from "react";
import { CartList } from "./CartList";
import { shallow } from "enzyme";

describe("Cart", () => {
  it("renders a div that informs when the cart is empty", () => {
    let props = { cart: [] };
    let wrapper = shallow(<CartList {...props} />);

    expect(wrapper.find({ id: "cart-empty" }).exists()).toBe(true);
  });

  describe("There are items in the cart", () => {
    let props = {
      cart: [
        {
          shoe: {
            brand: "MyBrand",
            model: "MyModel",
            frontImage: "Image.jpg",
            price: 30,
          },
          sizes: [42, 44, 46],
        },
        {
          shoe: {
            brand: "AnotherBrand",
            model: "AnotherModel",
            frontImage: "Image.jpg",
            price: 20,
          },
          sizes: [44, 46],
        },
      ],
    };
    let wrapper = shallow(<CartList {...props} />);

    it("renders a table", () => {
      expect(wrapper.find("table").exists()).toBe(true);
    });

    it("calculates the price correctly", () => {
      let id = props.cart[1].shoe.model;
      let price = props.cart[1].shoe.price * props.cart[1].sizes.length;

      expect(wrapper.find({ id }).find({ id: "price" }).text()).toEqual(
        "$" + price.toFixed(2)
      );
    });

    it("renders the count correctly based on the length of the sizes array", () => {
      let id = props.cart[0].shoe.model;
      let expected = `3x ${props.cart[0].shoe.brand} ${props.cart[0].shoe.model}`;

      expect(wrapper.find({ id }).find({ id: "count" }).text()).toEqual(
        expected
      );
    });

    it("renders the sizes correctly", () => {
      let id = props.cart[0].shoe.model;
      expect(wrapper.find({ id }).find({ id: "sizes" }).text()).toEqual(
        "Sizes: 42, 44, 46"
      );
    });

    it("renders a link to the checkout route", () => {
      expect(wrapper.find({ to: "/checkout" }).exists()).toBe(true);
    });
  });
});

import React from "react";
import { shallow } from "enzyme";
import OrderList from "./OrderList";

describe("OrderList", () => {
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
          sizes: [43, 44, 42],
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
      totalPrice: 130,
    };
    let wrapper = shallow(<OrderList {...props} />);

    it("renders a table", () => {
      expect(wrapper.find("table").exists()).toBe(true);
    });

    it("calculates the price correctly", () => {
      let index = 1;
      let price = props.cart[index].shoe.price * props.cart[index].sizes.length;
      expect(
        wrapper.find("tbody").find("tr").at(index).find(".price-info").text()
      ).toEqual("$" + price.toFixed(2));
    });

    it("renders the count correctly based on the length of the sizes array", () => {
      let index = 0;
      let expected = `3x ${props.cart[index].shoe.brand} ${props.cart[index].shoe.model}`;

      expect(
        wrapper.find("tbody").find("tr").at(index).find("h5").text()
      ).toEqual(expected);
    });

    it("renders the sizes correctly", () => {
      let index = 0;
      expect(
        wrapper
          .find("tbody")
          .find("tr")
          .at(index)
          .find(".shoe-info")
          .find("p")
          .text()
      ).toEqual("Sizes: 43, 44, 42");
    });
  });
});

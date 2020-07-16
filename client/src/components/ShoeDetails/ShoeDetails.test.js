import React from "react";
import { shallow, setProps } from "enzyme";
import { ShoeDetails } from "./ShoeDetails";
describe("ShoeDetails", () => {
  let wrapper, props;
  props = { fetchShoeDetails: jest.fn(), id: 123 };

  it("calls the fetching function", () => {
    const fetchShoeDetails = jest.fn();
    props = { ...props, fetchShoeDetails };
    wrapper = shallow(<ShoeDetails {...props} />);

    expect(fetchShoeDetails).toBeCalledTimes(1);
  });

  describe("there are no details", () => {
    props = { ...props, shoeDetails: null };
    wrapper = shallow(<ShoeDetails {...props} />);

    it("renders an error page", () => {
      expect(wrapper.find({ id: "error-page" }).exists()).toBe(false);
    });
  });

  describe("there are details", () => {
    const addToCart = jest.fn();
    props = {
      ...props,
      shoeDetails: {
        brand: "Brand",
        price: 150,
        frontImage: "image.jpg",
        images: ["image2.jpg", "image3.jpg"],
        sizes: [44, 45],
      },
      addToCart,
    };
    wrapper = shallow(<ShoeDetails {...props} />);

    it("sets the front image as default state for a selected image", () => {
      wrapper.setProps(props);

      expect(wrapper.state().selectedImage).toEqual(
        props.shoeDetails.frontImage
      );
    });

    it("sets the clicked image as selected image in state", () => {
      wrapper.find({ id: "images" }).find({ id: "image0" }).simulate("click");

      expect(wrapper.state().selectedImage).toEqual(
        props.shoeDetails.images[0]
      );
    });

    it("button is disabled if size isn't selected", () => {
      expect(wrapper.find({ id: "cart-button" }).props().disabled).toBe(true);
    });

    it("button is enabled if size is selected", () => {
      wrapper
        .find({ id: "sizes" })
        .find({ value: 44 })
        .simulate("click", {}, { value: 44 });

      expect(wrapper.find({ id: "cart-button" }).props().disabled).toBe(false);
    });

    it("sets the clicked size as selected size in state", () => {
      wrapper
        .find({ id: "sizes" })
        .find({ value: 44 })
        .simulate("click", {}, { value: 44 });

      expect(wrapper.state().selectedSize).toEqual(props.shoeDetails.sizes[0]);
    });

    it("calls the addToCart function when the button is clicked", () => {
      wrapper.find({ id: "cart-button" }).simulate("click");

      expect(addToCart).toBeCalledTimes(1);
    });
  });
});

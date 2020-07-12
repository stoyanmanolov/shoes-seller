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
    props = {
      ...props,
      shoeDetails: {
        brand: "Brand",
        price: 150,
        frontImage: "image.jpg",
        images: ["image2.jpg", "image3.jpg"],
        sizes: [44, 45],
      },
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

    it("sets the clicked size as selected size in state", () => {
      wrapper
        .find({ id: "sizes" })
        .find({ value: 44 })
        .simulate("click", {}, { value: 44 });

      expect(wrapper.state().selectedSize).toEqual(props.shoeDetails.sizes[0]);
    });
  });
});

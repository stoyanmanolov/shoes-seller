import React from "react";
import { shallow } from "enzyme";
import { ShoesList } from "./ShoesList";

describe("ShoesList", () => {
  let wrapper, props;

  it("renders correctly", () => {
    const fetchShoesList = jest.fn();
    props = { fetchShoesList, shoesList: { shoes: [] } };
    wrapper = shallow(<ShoesList {...props} />);
    expect(wrapper.find({ id: "shoes-list" }).exists()).toBe(true);
  });

  describe("When there are no shoes", () => {
    const fetchShoesList = jest.fn();

    beforeAll(() => {
      props = { fetchShoesList, shoesList: { shoes: [] } };
      wrapper = shallow(<ShoesList {...props} />);
    });

    it("calls the fetching function when the component mounts", () => {
      expect(fetchShoesList).toBeCalledTimes(1);
    });

    it("renders a loader when there are no shoes", () => {
      expect(wrapper.find({ id: "loader-container" }).exists()).toBe(true);
    });
  });

  describe("When there are shoes", () => {
    const fetchShoesList = jest.fn();
    const clearShoesList = jest.fn();

    beforeAll(() => {
      props = {
        fetchShoesList,
        clearShoesList,
        shoesList: {
          shoes: [{ brand: "Some Brand" }, { brand: "Other Brand" }],
        },
      };
      wrapper = shallow(<ShoesList {...props} />);
    });

    it("clears the current page's shoes and calls the fetching function when the pagination changes", () => {
      wrapper.find({ id: "pagination" }).simulate("change", {}, { page: 1 });
      expect(clearShoesList).toBeCalledTimes(1);
      expect(fetchShoesList).toBeCalledTimes(2);
    });

    it("clears the current page's shoes and calls the fetching function when the dropdown changes", () => {
      wrapper
        .find({ id: "dropdown" })
        .simulate("change", {}, { value: "value" });
      expect(clearShoesList).toBeCalledTimes(2);
      expect(fetchShoesList).toBeCalledTimes(3);
    });

    it("shows a card for each shoes", () => {
      props.shoesList.shoes.forEach((shoe) => {
        expect(
          wrapper.find({ id: "list" }).find({ id: shoe.brand }).exists()
        ).toBe(true);
      });
    });
  });
});

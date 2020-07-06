import React from "react";
import { shallow } from "enzyme";
import { ShoesList } from "./ShoesList";

describe("ShoesList", () => {
  let wrapper, props;

  it("renders correctly", () => {
    const fetchShoesList = jest.fn();
    const setCurrentSort = jest.fn();

    props = {
      setCurrentSort,
      fetchShoesList,
      shoesList: { shoes: [] },
    };
    wrapper = shallow(<ShoesList {...props} />);
    expect(wrapper.find({ id: "shoes-list" }).exists()).toBe(true);
  });

  describe("When there are no shoes", () => {
    const fetchShoesList = jest.fn();
    const setCurrentSort = jest.fn();

    beforeAll(() => {
      props = {
        setCurrentSort,
        fetchShoesList,
        shoesList: { shoes: [] },
        shoesListError: null,
      };
      wrapper = shallow(<ShoesList {...props} />);
    });

    it("calls the fetching function when the component mounts", () => {
      expect(fetchShoesList).toBeCalledTimes(1);
    });

    it("renders a loader when there are no shoes and no errors", () => {
      expect(wrapper.find({ id: "loader-container" }).exists()).toBe(true);
    });

    it("renders an error message if there is an error", () => {
      props = { ...props, shoesListError: { data: "error" } };
      wrapper = shallow(<ShoesList {...props} />);
      expect(wrapper.find({ id: "error" }).exists()).toBe(true);
    });
  });

  describe("When there are shoes", () => {
    const fetchShoesList = jest.fn();
    const clearShoesList = jest.fn();
    const setCurrentSort = jest.fn();

    beforeAll(() => {
      props = {
        fetchShoesList,
        clearShoesList,
        setCurrentSort,
        shoesList: {
          shoes: [
            { _id: 123, brand: "Some Brand" },
            { _id: 12345, brand: "Other Brand" },
          ],
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

    it("shows a card for each shoe", () => {
      props.shoesList.shoes.forEach((shoe) => {
        expect(
          wrapper.find({ id: "list" }).find({ id: shoe.brand }).exists()
        ).toBe(true);
      });
    });

    it("renders a link that redirects to a specific shoe based on id", () => {
      props.shoesList.shoes.forEach((shoe) => {
        expect(
          wrapper
            .find({ id: "list" })
            .find({ id: shoe._id.toString() })
            .prop("to")
        ).toBe("/shoe/" + shoe._id);
      });
    });
  });
});

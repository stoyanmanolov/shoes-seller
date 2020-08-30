import React from "react";
import { shallow } from "enzyme";
import { ShoesList } from "./ShoesList";
import ShoeCard from "./components/ShoeCard";

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
            { _id: 123, brand: "Some Brand", price: 20 },
            { _id: 12345, brand: "Other Brand", price: 30.99 },
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
      const { length } = props.shoesList.shoes;
      expect(wrapper.find({ id: "list" }).find(ShoeCard)).toHaveLength(2);
    });
  });
});

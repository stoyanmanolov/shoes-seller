import React from "react";
import { shallow } from "enzyme";
import { FilterMenu } from "./FilterMenu";
import { FilterSection } from "./FilterMenu-styles";

describe("FilterMenu", () => {
  const fetchFilterOptions = jest.fn();
  let props = {
    fetchFilterOptions,
    filterOptions: { optionNames: null, selectedOptions: null },
    shoesList: { shoesPerPage: 3 },
  };
  let wrapper = shallow(<FilterMenu {...props} />);

  it("renders all the FilterSections", () => {
    const expectedSections = [
      { title: "category" },
      { title: "brand" },
      { title: "model" },
      { title: "color" },
      { title: "price" },
      { title: "sizes" },
    ];

    expectedSections.forEach(({ title }) => {
      expect(wrapper.find(FilterSection).find({ id: title }).exists()).toBe(
        true
      );
    });
  });

  it("renders an up or down chevron based on whether the section is clicked", () => {
    const clicked = "brand";
    const notClicked = "category";
    wrapper.setState({ sectionsClicked: [clicked] });

    expect(
      wrapper
        .find(FilterSection)
        .find({ id: clicked })
        .find(".fa-chevron-up")
        .exists()
    ).toBe(true);

    expect(
      wrapper
        .find(FilterSection)
        .find({ id: notClicked })
        .find(".fa-chevron-down")
        .exists()
    ).toBe(true);
  });

  it("calls the data fetching function for the filter options", () => {
    expect(fetchFilterOptions).toBeCalledTimes(1);
  });

  it("renders a loader when there are no filter options", () => {
    expect(wrapper.find({ id: "loader" }).exists()).toBe(true);
  });

  it("calls the clearing function when the component unmounts", () => {
    const clearFilters = jest.fn();
    props = { ...props, clearFilters };
    wrapper = shallow(<FilterMenu {...props} />);

    wrapper.unmount();
    expect(clearFilters).toBeCalledTimes(1);
  });
});

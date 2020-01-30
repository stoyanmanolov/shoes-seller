import React from "react";
import { shallow } from "enzyme";
import { FilterMenu } from "./FilterMenu";
import { FilterSection } from "./FilterMenu-styles";

describe("FilterMenu", () => {
  it("renders all the FilterSections", () => {
    let props = { fetchFilterOptions: jest.fn() };
    let wrapper = shallow(<FilterMenu {...props} />);

    let expectedSections = [
      { title: "category" },
      { title: "brand" },
      { title: "model" },
      { title: "price" },
      { title: "sizes" }
    ];

    expectedSections.forEach(({ title }) => {
      expect(
        wrapper
          .find(FilterSection)
          .find({ id: title })
          .exists()
      ).toBe(true);
    });
  });

  it("renders an up or down chevron based on whether the section is clicked", () => {
    let props = { fetchFilterOptions: jest.fn() };
    let wrapper = shallow(<FilterMenu {...props} />);

    let clicked = "brand";
    let notClicked = "category";
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
});

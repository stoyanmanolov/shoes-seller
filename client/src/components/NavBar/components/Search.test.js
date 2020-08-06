import React from "react";
import { shallow } from "enzyme";
import { Search } from "./Search";

describe("Search", () => {
  let wrapper;
  wrapper = shallow(<Search />);
  it("toggles the modal on button click", () => {
    wrapper.find("button").simulate("click");
    expect(wrapper.find("Modal").prop("isOpen")).toBe(true);
  });

  describe("Has shoes matching the input", () => {
    beforeAll(() => {
      wrapper = shallow(<Search />);

      wrapper.setState({
        matchingShoes: [
          { brand: "Brand", model: "Model" },
          { brand: "AnotherBrand", model: "AnotherModel" },
        ],
      });
    });

    it("renders the matching shoes", () => {
      wrapper.state().matchingShoes.forEach((shoe) => {
        expect(wrapper.find("List").find({ id: shoe.model }).exists()).toBe(
          true
        );
      });
    });
  });
});

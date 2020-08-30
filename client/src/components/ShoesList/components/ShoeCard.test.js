import React from "react";
import { shallow } from "enzyme";
import { ShoeCard } from "./ShoeCard";
import * as axios from "axios";

jest.mock("axios");

describe("ShoeCard", () => {
  const fetchShoesList = jest.fn();
  const clearShoesList = jest.fn();

  const props = {
    fetchShoesList,
    clearShoesList,
    shoesList: { currentPage: 1, currentSort: "" },
    shoe: { _id: 123, brand: "Some Brand", model: "Some Model", price: 20 },
    user: { role: "admin" },
    token: 123,
  };
  const wrapper = shallow(<ShoeCard {...props} />);
  it("renders a link that redirects to a specific shoe based on id", () => {
    expect(wrapper.find({ id: props.shoe._id.toString() }).prop("to")).toBe(
      "/shoe/" + props.shoe._id
    );
  });

  it("on clicking the delete button calls the deleting request", () => {
    axios.delete.mockImplementation(() =>
      Promise.resolve({ data: { message: "Message" } })
    );
    window.alert = jest.fn();
    wrapper.find("Button").simulate("click", { preventDefault: jest.fn() });
    expect(axios.delete).toBeCalledTimes(1);
  });
});

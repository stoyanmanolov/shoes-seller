import React from "react";
import { shallow } from "enzyme";
import { OrdersList } from "./OrdersList";

describe("OrdersList", () => {
  let wrapper;
  const fetchOrders = jest.fn();
  let props = { fetchOrders, ordersList: [], error: null };

  it("calls the function that fetches the orders", () => {
    wrapper = shallow(<OrdersList {...props} />);
    expect(fetchOrders).toBeCalledTimes(1);
  });

  it("renders an Error if there is one", () => {
    props = {
      ...props,
      ordersList: [],
      error: { status: 401, statusText: "Unauthorized" },
    };
    wrapper = shallow(<OrdersList {...props} />);
    expect(wrapper.find("Error").exists()).toBe(true);
  });
});

import React from "react";
import { shallow } from "enzyme";
import { OrdersList } from "./OrdersList";

describe("OrdersList", () => {
  let wrapper, props;
  const fetchOrders = jest.fn();
  props = { fetchOrders, ordersList: [], error: null };

  it("calls the function that fetches the orders", () => {
    wrapper = shallow(<OrdersList {...props} />);
    expect(fetchOrders).toBeCalledTimes(1);
  });

  it("renders an Error if there is one", () => {
    props = {
      ...props,
      error: { status: 401, statusText: "Unauthorized" },
    };
    wrapper = shallow(<OrdersList {...props} />);
    expect(wrapper.find("Error").exists()).toBe(true);
  });

  describe("Has orders", () => {
    beforeAll(() => {
      props = {
        ...props,
        error: null,
        ordersList: [
          { firstName: "John", lastName: "Doe", price: 70, completed: false },
          { firstName: "Jane", lastName: "Doe", price: 80, completed: true },
        ],
      };
      wrapper = shallow(<OrdersList {...props} />);
    });

    it("renders a table", () => {
      expect(wrapper.find("table").exists()).toBe(true);
    });

    it("renders more information when clicking", () => {
      wrapper.find("tr").at(1).find("td").at(0).simulate("click");
      expect(
        wrapper
          .find("tr")
          .find("td")
          .at(0)
          .find({ id: "more-details" })
          .exists()
      ).toBe(true);
    });

    it("renders a completed Yes or No accordingly", () => {
      expect(
        wrapper.find("tr").at(1).find("td").at(2).find("p").at(0).text()
      ).toBe("No");
      expect(wrapper.find("tr").at(2).find("td").at(2).find("p").text()).toBe(
        "Yes"
      );
    });
  });
});

import React from "react";
import { shallow } from "enzyme";
import { Order } from "./Order";

describe("Order", () => {
  let wrapper, props;

  it("renders a message if the cart is empty", () => {
    props = { cart: [] };
    wrapper = shallow(<Order {...props} />);
    expect(wrapper.find({ id: "order-cart-empty" }).exists()).toBe(true);
  });

  it("renders a success message if the order was completed", () => {
    props = { cart: [{}] };
    wrapper = shallow(<Order {...props} />);
    wrapper.setState({ orderDetails: { firstName: "firstname" } });
    expect(wrapper.find({ id: "order-successful" }).exists()).toBe(true);
  });

  it("renders an Error if the order wasm't completed", () => {
    props = { cart: [{}] };
    wrapper = shallow(<Order {...props} />);
    wrapper.setState({
      orderError: { status: 400, statusText: "Bad Request" },
    });
    expect(wrapper.find({ id: "order-error" }).exists()).toBe(true);
  });
});

import React, { useState } from "react";
import { Form, Message } from "semantic-ui-react";
import * as Styled from "./OrderForm.styles";
import _ from "lodash";
import { OrdersAPI } from "../../../api";
import { getValidationErrors } from "./OrderForm.utils";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../../redux/actions/ordersActions";

export const OrderForm = ({ setOrderId, setError }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const cart = useSelector((state) => state.orders.cart);
  const totalPrice = useSelector((state) => state.orders.totalPrice);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const submitData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
      city: formData.get("city"),
      address: formData.get("address"),
    };

    const errors = getValidationErrors(submitData);
    setValidationErrors(errors);

    if (_.isEmpty(errors)) {
      submitData.cart = cart;
      submitData.price = totalPrice;

      OrdersAPI.sendOrder(submitData)
        .then((res) => {
          setOrderId(res.data._id);
          dispatch(resetCart());
        })
        .catch((err) => setError(err.response));
    }
  };

  const formFields = [
    {
      label: "First Name",
      valueName: "firstName",
    },
    {
      label: "Last Name",
      valueName: "lastName",
    },
    {
      label: "Email",
      valueName: "email",
    },
    {
      label: "Phone Number",
      valueName: "phoneNumber",
    },
    {
      label: "City",
      valueName: "city",
    },
    {
      label: "Address",
      valueName: "address",
    },
  ];

  return (
    <div>
      <Styled.Heading>Billing details</Styled.Heading>
      <Styled.Form onSubmit={handleSubmit}>
        {formFields.map(({ label, valueName }, index) => {
          return (
            <React.Fragment key={index}>
              <Form.Field id={valueName}>
                {validationErrors[valueName] ? (
                  <Message
                    negative
                    size="tiny"
                    header={validationErrors[valueName]}
                  />
                ) : null}
                <label>{label}</label>
                <input name={valueName} placeholder={label} />
              </Form.Field>
            </React.Fragment>
          );
        })}
        <Styled.Button primary type="submit">
          Place order
        </Styled.Button>
      </Styled.Form>
    </div>
  );
};

export default OrderForm;

import React from "react";
import { shallow } from "enzyme";
import { ShoesForm } from "./ShoesForm";

describe("ShoesForm", () => {
  let wrapper = shallow(<ShoesForm />);

  describe("Submitting the form", () => {
    const submitValues = inputValues => {
      let outputValues = {
        brand: "",
        model: "",
        category: "",
        price: "",
        description: "",
        color: "",
        amount: "",
        sizes: "",
        images: [],
        gender: null,
        forKids: null
      };

      Object.keys(inputValues).forEach(value => {
        outputValues[value] = inputValues[value];
      });

      function FormDataMock() {
        this.get = jest.fn(value => {
          if (value) return outputValues[value];
          else return "";
        });
        this.getAll = jest.fn(value => {
          if (value) return outputValues[value];
          else return "";
        });
      }
      global.FormData = FormDataMock;

      const fakeEvent = {
        preventDefault: jest.fn()
      };

      wrapper.find("Form").simulate("submit", fakeEvent);
    };

    it("creates errors for empty inputs", () => {
      let values = {
        description: ""
      };
      submitValues(values);

      expect(wrapper.state().errors.description).toBeTruthy();
    });

    it("handles size errors correctly", () => {
      const incorrectArray = [
        {
          sizes: "43, 123"
        },
        {
          sizes: "42, 42"
        },
        {
          sizes: "22,21"
        }
      ];
      incorrectArray.forEach(values => {
        submitValues(values);

        expect(wrapper.state().errors.sizes).toBeTruthy();
      });

      const correctArray = [
        {
          sizes: "43"
        },
        {
          sizes: "42, 41"
        },
        {
          sizes: "41, 24"
        }
      ];
      correctArray.forEach(values => {
        submitValues(values);

        expect(wrapper.state().errors.sizes).toBeFalsy();
      });
    });

    it("handles price errors correctly", () => {
      const incorrectArray = [
        {
          price: "432, 45123"
        },
        {
          price: "This isn't a price"
        },
        {
          price: "10001,12 3"
        }
      ];
      incorrectArray.forEach(values => {
        submitValues(values);

        expect(wrapper.state().errors.price).toBeTruthy();
      });

      const correctArray = [
        {
          price: "432"
        },
        {
          price: "123.12"
        },
        {
          price: "$10.12"
        }
      ];

      correctArray.forEach(values => {
        submitValues(values);

        expect(wrapper.state().errors.price).toBeFalsy();
      });
    });
  });
});

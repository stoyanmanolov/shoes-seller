import React from "react";
import { shallow } from "enzyme";
import { ShoesForm } from "./ShoesForm";
import { isUndefined } from "lodash";

describe("ShoesForm", () => {
  let wrapper = shallow(<ShoesForm />);

  describe("Submitting the form", () => {
    const submitValues = (inputValues) => {
      let outputValues = {
        brand: "",
        model: "",
        category: "",
        price: "",
        description: "",
        color: "",
        amounts: [],
        sizes: [],
        amountPerSizes: {},
        images: [],
        gender: null,
        forKids: null,
      };

      Object.keys(inputValues).forEach((value) => {
        outputValues[value] = inputValues[value];
      });

      function FormDataMock() {
        this.get = jest.fn((value) => {
          if (value) return outputValues[value];
          else return "";
        });
        this.getAll = jest.fn((value) => {
          if (value) return outputValues[value];
          else return "";
        });
      }
      global.FormData = FormDataMock;

      const fakeEvent = {
        preventDefault: jest.fn(),
      };

      wrapper.find("Form").simulate("submit", fakeEvent);
    };

    it("creates errors for empty inputs", () => {
      let values = {
        description: "",
      };
      submitValues(values);

      expect(wrapper.state().errors.description).toBeTruthy();
    });

    it("handles price errors correctly", () => {
      const incorrectArray = [
        {
          price: "432, 45123",
        },
        {
          price: "This isn't a price",
        },
        {
          price: "10001,12 3",
        },
      ];
      incorrectArray.forEach((values) => {
        submitValues(values);

        expect(wrapper.state().errors.price).toBeTruthy();
      });

      const correctArray = [
        {
          price: "432",
        },
        {
          price: "123.12",
        },
      ];

      correctArray.forEach((values) => {
        submitValues(values);

        expect(wrapper.state().errors.price).toBeFalsy();
      });
    });

    it("handles sizes and amounts errors correctly", () => {
      const incorrectArray = [
        {
          sizes: [123, 42],
          amounts: [400, 200],
        },
        {
          sizes: [12, 42],
          amounts: [200, ""],
        },
      ];
      incorrectArray.forEach((values) => {
        submitValues(values);

        expect(wrapper.state().errors.amountPerSizes).toBeTruthy();
      });

      const correct = {
        sizes: [42, 43, 44],
        amounts: [500, 100, 30],
      };
      submitValues(correct);

      expect(wrapper.state().errors.amountPerSizes).toBeFalsy();
    });
  });
});

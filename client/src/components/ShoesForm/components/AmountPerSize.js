import React from "react";
import { Button, Input } from "semantic-ui-react";

class AmountPerSize extends React.Component {
  state = {
    inputs: [
      {
        size: {
          type: "number",
          name: "sizes",
        },
        amount: {
          type: "number",
          name: "amounts",
        },
      },
    ],
    sizeValues: [{ value: "" }],
    amountValues: [{ value: "" }],
  };

  handleClick = () => {
    this.setState({
      inputs: [...this.state.inputs, this.state.inputs[0]],
    });
  };

  handleChange = (value, array, name, index) => {
    let values = [...array];
    let item = {
      ...values[index],
      value,
    };
    values[index] = item;
    if (name === "sizes") {
      this.setState({ sizeValues: values });
    } else if (name === "amounts") {
      this.setState({ amountValues: values });
    }
  };

  isDisabled = (sizeValues, amountValues) => {
    if (
      !sizeValues[sizeValues.length - 1].value ||
      !amountValues[amountValues.length - 1].value
    ) {
      return true;
    }
    return false;
  };

  renderInput = (input, inputValues, index) => {
    return (
      <Input
        name={input.name}
        onChange={(e) =>
          this.handleChange(e.target.value, inputValues, input.name, index)
        }
        style={{ width: "50%" }}
        placeholder={input.name}
        value={inputValues[index].value}
        {...input}
      />
    );
  };

  renderInputs = (inputs) => {
    return inputs.map(({ size, amount }, index) => {
      return (
        <React.Fragment key={index}>
          {this.renderInput(size, this.state.sizeValues, index)}
          {this.renderInput(amount, this.state.amountValues, index)}
        </React.Fragment>
      );
    });
  };

  render() {
    return (
      <>
        {this.renderInputs(this.state.inputs)}
        <Button
          type="button"
          onClick={(e) => {
            this.setState({
              sizeValues: [...this.state.sizeValues, { value: "" }],
              amountValues: [...this.state.amountValues, { value: "" }],
            });
            this.handleClick();
          }}
          disabled={this.isDisabled(
            this.state.sizeValues,
            this.state.amountValues
          )}
        >
          Add more
        </Button>
      </>
    );
  }
}

export default AmountPerSize;

import React from "react";
import { Button, Input, Label } from "semantic-ui-react";

class FileUploads extends React.Component {
  state = {
    inputs: [
      {
        type: "file",
        id: "images",
        name: "images",
        accept: ".jpg, .jpeg, .png",
        multiple: false,
      },
    ],
    firstInputChanged: false,
    maximumFiles: 5,
  };

  handleClick = () => {
    this.setState({
      inputs: [
        ...this.state.inputs,
        {
          type: "file",
          id: "images",
          name: "images",
          accept: ".jpg, .jpeg, .png",
          multiple: true,
        },
      ],
    });
  };

  isDisabled = () => {
    const { maximumFiles, inputs, firstInputChanged } = this.state;

    if (inputs.length === 1) {
      if (firstInputChanged) {
        return false;
      } else return true;
    }
    if (inputs.length >= maximumFiles) {
      return true;
    } else return false;
  };

  render() {
    const { inputs } = this.state;

    return (
      <>
        {inputs.map((props, index) => {
          if (index === 0)
            return (
              <React.Fragment key={index}>
                <Label>Front image:</Label>
                <Input
                  onChange={(e) => this.setState({ firstInputChanged: true })}
                  key={index}
                  {...props}
                />
              </React.Fragment>
            );
          else if (index === 1)
            return (
              <React.Fragment key={index}>
                <Label>Other:</Label>
                <Input key={index} {...props} />
              </React.Fragment>
            );
          else
            return (
              <React.Fragment key={index}>
                <Input key={index} {...props} />
              </React.Fragment>
            );
        })}
        <Button
          type="button"
          onClick={(e) => this.handleClick()}
          disabled={this.isDisabled()}
        >
          Add more
        </Button>
      </>
    );
  }
}

export default FileUploads;

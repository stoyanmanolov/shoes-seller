import React from "react";
import { StyledSearch } from "./Search-styles";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Input } from "semantic-ui-react";

class Search extends React.Component {
  state = { toggled: false, input: "" };

  handleClick = (e) => {
    this.setState({ toggled: !this.state.toggled });
  };

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  render() {
    return (
      <StyledSearch>
        <button className="search-button" onClick={this.handleClick}>
          <i className="fas fa-search"></i>
        </button>
        <Modal isOpen={this.state.toggled} toggle={this.handleClick}>
          <ModalHeader toggle={this.handleClick}>
            <i style={{ marginRight: "5px" }} className="fas fa-search"></i>{" "}
            Search shoes
          </ModalHeader>
          <ModalBody>
            <Input
              fluid
              icon="search"
              placeholder="Search shoes..."
              onChange={this.handleChange}
              value={this.state.input}
            />
          </ModalBody>
          <ModalFooter>
            <Button secondary onClick={this.handleClick}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </StyledSearch>
    );
  }
}

export default Search;
